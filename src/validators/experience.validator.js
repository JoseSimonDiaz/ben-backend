import { body } from 'express-validator';

export const experienceSubmissionValidation = [
  body('careerId').isMongoId(),
  body('collaboratorName').isString().trim().notEmpty(),
  body('collaboratorEmail').isEmail(),

  body('university')
    .optional()
    .isString()
    .trim(),

  body('graduated')
    .optional()
    .isIn(['yes', 'no', 'in_progress']),

  body('difficultyRating')
    .optional()
    .isInt({ min: 1, max: 10 }),

  body('jobMarketRating')
    .optional()
    .isInt({ min: 1, max: 5 }),

  body('foundRelatedJob')
    .optional()
    .isIn(['yes', 'no', 'partial']),

  body('bestAspects')
    .optional()
    .isArray({ max: 3 }),
  body('bestAspects.*')
    .optional()
    .isString()
    .trim(),

  body('worstAspects')
    .optional()
    .isArray({ max: 3 }),
  body('worstAspects.*')
    .optional()
    .isString()
    .trim(),

  body('importantSkills')
    .optional()
    .isArray({ max: 5 }),
  body('importantSkills.*')
    .optional()
    .isString()
    .trim(),

  body('hardestSubjects')
    .optional()
    .isArray({ max: 3 }),
  body('hardestSubjects.*')
    .optional()
    .isString()
    .trim(),

  body('recommendationRating')
    .optional()
    .isInt({ min: 1, max: 5 }),

  body('reviewText')
    .optional()
    .isString()
    .trim(),
];
