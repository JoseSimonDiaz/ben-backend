import { body } from 'express-validator';

export const quizSubmissionValidation = [
  body('answers').isArray({ min: 1 }),
  body('answers.*.questionId').isMongoId(),
  body('answers.*.selectedOptionIndex').isInt({ min: 0 }),
  body('preferredDuration').isIn(['long', 'short']),
  body('email').optional().isEmail(),
];
