import { Question } from '../models/Question.model.js';
import { Career } from '../models/Career.model.js';
import { QuizSession } from '../models/QuizSession.model.js';
import { extractField, findById } from '../utils/arrayHelpers.js';
import { PREFERRED_DURATIONS, CAREER_DURATION_THRESHOLD, QUESTION_TYPES } from '../constants/domain.js';
import { AppError } from '../utils/AppError.js';
import { HTTP_STATUS } from '../utils/httpStatus.js';

function aggregateScores(answers, questions, index, profile) {
  if (index >= answers.length) return profile;

  const currentAnswer = answers[index];
  const matchedQuestion = findById(questions, currentAnswer.questionId, 0);
  const selectedScore = matchedQuestion.options[currentAnswer.selectedOptionIndex].score;

  profile.logical += selectedScore.logical;
  profile.creative += selectedScore.creative;
  profile.social += selectedScore.social;
  profile.investigative += selectedScore.investigative;

  return aggregateScores(answers, questions, index + 1, profile);
}

function collectMaxOptionScore(options, index, maximums) {
  if (index >= options.length) return maximums;

  const optionScore = options[index].score;
  if (optionScore.logical > maximums.logical) maximums.logical = optionScore.logical;
  if (optionScore.creative > maximums.creative) maximums.creative = optionScore.creative;
  if (optionScore.social > maximums.social) maximums.social = optionScore.social;
  if (optionScore.investigative > maximums.investigative) maximums.investigative = optionScore.investigative;

  return collectMaxOptionScore(options, index + 1, maximums);
}

function sumQuestionMaximums(questions, index, totalMax) {
  if (index >= questions.length) return totalMax;

  const questionMaximums = collectMaxOptionScore(questions[index].options, 0, { logical: 0, creative: 0, social: 0, investigative: 0 });

  totalMax.logical += questionMaximums.logical;
  totalMax.creative += questionMaximums.creative;
  totalMax.social += questionMaximums.social;
  totalMax.investigative += questionMaximums.investigative;

  return sumQuestionMaximums(questions, index + 1, totalMax);
}

function filterByDuration(careers, preferredDuration, index, accumulator) {
  if (index >= careers.length) return accumulator;

  const currentCareer = careers[index];
  const isShortCareer = currentCareer.durationYears < CAREER_DURATION_THRESHOLD;

  if (preferredDuration === PREFERRED_DURATIONS.SHORT && isShortCareer) {
    accumulator.push(currentCareer);
  } else if (preferredDuration === PREFERRED_DURATIONS.LONG && !isShortCareer) {
    accumulator.push(currentCareer);
  }

  return filterByDuration(careers, preferredDuration, index + 1, accumulator);
}

function calculateEuclideanDistance(userProfile, careerSkills) {
  const logicalDifference = userProfile.logical - careerSkills.logical;
  const creativeDifference = userProfile.creative - careerSkills.creative;
  const socialDifference = userProfile.social - careerSkills.social;
  const investigativeDifference = userProfile.investigative - careerSkills.investigative;

  return Math.sqrt(
    logicalDifference * logicalDifference +
    creativeDifference * creativeDifference +
    socialDifference * socialDifference +
    investigativeDifference * investigativeDifference
  );
}

function locateBestCareer(careers, userProfile, index, bestMatch) {
  if (index >= careers.length) return bestMatch;

  const currentCareer = careers[index];
  const currentDistance = calculateEuclideanDistance(userProfile, currentCareer.requiredSkills);

  if (currentDistance < bestMatch.distance) {
    bestMatch.careerId = currentCareer._id;
    bestMatch.careerName = currentCareer.name;
    bestMatch.distance = currentDistance;
  }

  return locateBestCareer(careers, userProfile, index + 1, bestMatch);
}

function computeMatchPercentage(bestDistance, maxPossibleDistance) {
  if (maxPossibleDistance === 0) return 100;
  return Math.round((1 - bestDistance / maxPossibleDistance) * 100);
}

function findMaximumProfileScore(questions) {
  const zeroProfile = { logical: 0, creative: 0, social: 0, investigative: 0 };
  return sumQuestionMaximums(questions, 0, zeroProfile);
}

export class MatchingService {
  async calculateProfile(answers) {
    const questionIds = extractField(answers, 'questionId', 0, []);
    const questions = await Question.find({ _id: { $in: questionIds }, questionType: QUESTION_TYPES.MULTIPLE_CHOICE });
    const zeroProfile = { logical: 0, creative: 0, social: 0, investigative: 0 };

    return aggregateScores(answers, questions, 0, zeroProfile);
  }

  async findBestCareer(userProfile, preferredDuration) {
    const allCareers = await Career.find();
    const filteredCareers = filterByDuration(allCareers, preferredDuration, 0, []);

    if (filteredCareers.length === 0) {
      return null;
    }

    const initialMatch = {
      careerId: filteredCareers[0]._id,
      careerName: filteredCareers[0].name,
      distance: calculateEuclideanDistance(userProfile, filteredCareers[0].requiredSkills),
    };

    const bestMatch = locateBestCareer(filteredCareers, userProfile, 1, initialMatch);

    const allQuestions = await Question.find({ questionType: QUESTION_TYPES.MULTIPLE_CHOICE });
    const maxProfileScore = findMaximumProfileScore(allQuestions);
    const zeroSkills = { logical: 0, creative: 0, social: 0, investigative: 0 };
    const maxPossibleDistance = calculateEuclideanDistance(maxProfileScore, zeroSkills);

    return {
      careerId: bestMatch.careerId,
      careerName: bestMatch.careerName,
      matchPercentage: computeMatchPercentage(bestMatch.distance, maxPossibleDistance),
    };
  }

  async processSubmission(answers, preferredDuration) {
    const userProfile = await this.calculateProfile(answers);
    const matchResult = await this.findBestCareer(userProfile, preferredDuration);

    if (!matchResult) {
      throw new AppError('No careers match the selected duration', HTTP_STATUS.NOT_FOUND);
    }

    const quizSession = await QuizSession.create({
      answers,
      preferredDuration,
      recommendedCareerId: matchResult.careerId,
      matchPercentage: matchResult.matchPercentage,
    });

    return {
      careerId: matchResult.careerId,
      careerName: matchResult.careerName,
      matchPercentage: matchResult.matchPercentage,
      sessionId: quizSession._id,
    };
  }
}
