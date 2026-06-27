import { body } from 'express-validator';
import { PREFERRED_DURATIONS } from '../constants/domain.js';

export const quizSubmissionValidation = [
  body('answers').isArray({ min: 1 }),
  body('answers.*.questionId').isMongoId(),
  body('answers.*.selectedOptionIndex').isInt({ min: 0 }),
  body('preferredDuration').isIn(Object.values(PREFERRED_DURATIONS)),
  body('email').optional().isEmail(),
];
