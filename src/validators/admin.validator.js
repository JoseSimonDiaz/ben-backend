import { body } from 'express-validator';

export const facultyCreationValidation = [
  body('name').isString().trim().notEmpty(),
];

export const careerCreationValidation = [
  body('name').isString().trim().notEmpty(),
  body('facultyId').isMongoId(),
  body('officialDuration').isString().notEmpty(),
  body('durationYears').isInt({ min: 1 }),
];

export const questionCreationValidation = [
  body('questionText').isString().trim().notEmpty(),
  body('category').isIn(['logical', 'creative', 'social', 'investigative']),
  body('options').isArray({ min: 2 }),
];
