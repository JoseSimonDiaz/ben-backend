import { body } from 'express-validator';

export const experienceSubmissionValidation = [
  body('careerId').isMongoId(),
  body('collaboratorName').isString().trim().notEmpty(),
  body('collaboratorEmail').isEmail(),
  body('perceivedDropoutRate').optional().isInt({ min: 0, max: 100 }),
];
