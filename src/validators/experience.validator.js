import { body } from 'express-validator';
import {
  HIGH_SCHOOL_SUBJECTS,
  FREE_TIME_ACTIVITIES,
  ENJOYED_ACTIVITIES,
  PREFERRED_WORK_AREAS,
  IMPORTANT_SKILLS,
  PERSONALITY_TRAITS,
  DAILY_ACTIVITIES,
} from '../constants/domain.js';

const VALID_HIGH_SCHOOL_SUBJECTS = Object.values(HIGH_SCHOOL_SUBJECTS);
const VALID_FREE_TIME_ACTIVITIES = Object.values(FREE_TIME_ACTIVITIES);
const VALID_ENJOYED_ACTIVITIES = Object.values(ENJOYED_ACTIVITIES);
const VALID_PREFERRED_WORK_AREAS = Object.values(PREFERRED_WORK_AREAS);
const VALID_IMPORTANT_SKILLS = Object.values(IMPORTANT_SKILLS);
const VALID_PERSONALITY_TRAITS = Object.values(PERSONALITY_TRAITS);
const VALID_DAILY_ACTIVITIES = Object.values(DAILY_ACTIVITIES);

export const experienceSubmissionValidation = [
  body('careerId').isMongoId(),
  body('collaboratorName').isString().trim().notEmpty(),
  body('collaboratorEmail').isEmail(),

  body('favoriteHighSchoolSubjects')
    .optional()
    .isArray({ max: 3 })
    .withMessage('Máximo 3 materias'),
  body('favoriteHighSchoolSubjects.*')
    .isIn(VALID_HIGH_SCHOOL_SUBJECTS),

  body('freeTimeActivities')
    .optional()
    .isArray({ max: 3 })
    .withMessage('Máximo 3 actividades'),
  body('freeTimeActivities.*')
    .isIn(VALID_FREE_TIME_ACTIVITIES),

  body('enjoyedActivities')
    .optional()
    .isArray({ max: 3 })
    .withMessage('Máximo 3 actividades'),
  body('enjoyedActivities.*')
    .isIn(VALID_ENJOYED_ACTIVITIES),

  body('preferredWorkAreas')
    .optional()
    .isArray({ max: 2 })
    .withMessage('Máximo 2 áreas'),
  body('preferredWorkAreas.*')
    .isIn(VALID_PREFERRED_WORK_AREAS),

  body('importantSkills')
    .optional()
    .isArray({ max: 5 })
    .withMessage('Máximo 5 habilidades'),
  body('importantSkills.*')
    .isIn(VALID_IMPORTANT_SKILLS),

  body('personalityTraits')
    .optional()
    .isArray({ max: 5 })
    .withMessage('Máximo 5 rasgos'),
  body('personalityTraits.*')
    .isIn(VALID_PERSONALITY_TRAITS),

  body('dailyActivities')
    .optional()
    .isArray({ max: 3 })
    .withMessage('Máximo 3 actividades'),
  body('dailyActivities.*')
    .isIn(VALID_DAILY_ACTIVITIES),

  body('recommendationRating')
    .optional()
    .isInt({ min: 1, max: 5 }),

  body('mostDifficultSubjects')
    .optional()
    .isString()
    .trim(),

  body('perceivedDropoutRate').optional().isInt({ min: 0, max: 100 }),
];
