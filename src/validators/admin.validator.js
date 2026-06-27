import { body } from 'express-validator';
import { QUESTION_TARGETS, QUESTION_CATEGORIES } from '../constants/domain.js';

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
  body('target')
    .optional()
    .isIn(Object.values(QUESTION_TARGETS)),
  body('category')
    .if(body('target').not().equals(QUESTION_TARGETS.GRADUATE))
    .isIn(Object.values(QUESTION_CATEGORIES)),
  body('options')
    .if(body('target').not().equals(QUESTION_TARGETS.GRADUATE))
    .isArray({ min: 2 }),
  body('order').optional().isInt({ min: 0 }),
];
