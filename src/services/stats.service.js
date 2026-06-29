import mongoose from 'mongoose';
import { Career } from '../models/Career.model.js';
import { Question } from '../models/Question.model.js';
import { QuizSession } from '../models/QuizSession.model.js';
import { CareerExperience } from '../models/CareerExperience.model.js';

export class StatsService {
  async getDashboardStats() {
    const [totalCareers, totalQuestions, questionsByTarget, totalQuizSessions, totalExperiences] =
      await Promise.all([
        Career.countDocuments(),
        Question.countDocuments(),
        Question.aggregate([
          { $group: { _id: '$target', count: { $sum: 1 } } },
          { $project: { target: '$_id', count: 1, _id: 0 } },
        ]),
        QuizSession.countDocuments(),
        CareerExperience.countDocuments(),
      ]);

    return {
      totalCareers,
      totalQuestions,
      questionsByTarget,
      totalQuizSessions,
      totalExperiences,
    };
  }

  async getCareerStatistics(careerId) {
    const targetId = new mongoose.Types.ObjectId(careerId);

    const statistics = await CareerExperience.aggregate([
      { $match: { careerId: targetId } },
      {
        $group: {
          _id: null,
          averageDropoutRate: { $avg: '$perceivedDropoutRate' },
          totalExperiences: { $sum: 1 },
        },
      },
    ]);

    if (statistics.length === 0) {
      return {
        averageDropoutRate: null,
        totalExperiences: 0,
        topDifficultSubjects: [],
        commonJobProspects: [],
        insufficientData: true,
      };
    }

    const hardestSubjectsStats = await CareerExperience.aggregate([
      { $match: { careerId: targetId } },
      { $unwind: '$hardestSubjects' },
      { $group: { _id: '$hardestSubjects.name', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 },
      { $project: { subjectName: '$_id', count: 1, _id: 0 } },
    ]);

    const jobProspectStats = await CareerExperience.aggregate([
      { $match: { careerId: targetId } },
      { $unwind: '$jobProspects' },
      { $group: { _id: '$jobProspects.title', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $project: { jobTitle: '$_id', count: 1, _id: 0 } },
    ]);

    const aggregatedStats = statistics[0];

    return {
      averageDropoutRate: Math.round(aggregatedStats.averageDropoutRate * 10) / 10,
      totalExperiences: aggregatedStats.totalExperiences,
      topDifficultSubjects: hardestSubjectsStats,
      commonJobProspects: jobProspectStats,
      insufficientData: false,
    };
  }
}
