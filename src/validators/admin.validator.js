import { body, param } from 'express-validator';
import { QUESTION_TARGETS, QUESTION_CATEGORIES, QUESTION_TYPES } from '../constants/domain.js';

export const mongoIdParam = [
  param('id').isMongoId().withMessage('Invalid ID'),
];

export const facultyCreationValidation = [
  body('name').isString().trim().notEmpty(),
];

export const facultyUpdateValidation = [
  body('name').optional().isString().trim().notEmpty(),
  body('description').optional().isString(),
];

export const careerCreationValidation = [
  body('name').isString().trim().notEmpty(),
  body('facultyId').isMongoId(),
  body('officialDuration').isString().notEmpty(),
  body('durationYears').isInt({ min: 1 }),
];

export const careerUpdateValidation = [
  body('name').optional().isString().trim().notEmpty(),
  body('facultyId').optional().isMongoId(),
  body('officialDuration').optional().isString().notEmpty(),
  body('durationYears').optional().isInt({ min: 1 }),
  body('keywords').optional().isArray(),
  body('requiredSkills').optional().isObject(),
];

export const questionCreationValidation = [
  body('questionText').isString().trim().notEmpty(),
  body('questionType')
    .optional()
    .isIn(Object.values(QUESTION_TYPES)),
  body('target')
    .optional()
    .isIn(Object.values(QUESTION_TARGETS)),
  body('category')
    .if((_value, { req }) => {
      const currentType = req.body.questionType || QUESTION_TYPES.MULTIPLE_CHOICE;
      return currentType === QUESTION_TYPES.MULTIPLE_CHOICE && req.body.target !== QUESTION_TARGETS.GRADUATE;
    })
    .isIn(Object.values(QUESTION_CATEGORIES)),
  body('options')
    .if((_value, { req }) => !req.body.questionType || req.body.questionType === QUESTION_TYPES.MULTIPLE_CHOICE)
    .isArray({ min: 2 }),
  body('order').optional().isInt({ min: 0 }),
];

export const questionUpdateValidation = [
  body('questionText').optional().isString().trim().notEmpty(),
  body('questionType')
    .optional()
    .isIn(Object.values(QUESTION_TYPES)),
  body('target')
    .optional()
    .isIn(Object.values(QUESTION_TARGETS)),
  body('category')
    .optional()
    .if((_value, { req }) => {
      const currentType = req.body.questionType || QUESTION_TYPES.MULTIPLE_CHOICE;
      return currentType === QUESTION_TYPES.MULTIPLE_CHOICE && req.body.target !== QUESTION_TARGETS.GRADUATE;
    })
    .isIn(Object.values(QUESTION_CATEGORIES)),
  body('options')
    .optional()
    .if((_value, { req }) => !req.body.questionType || req.body.questionType === QUESTION_TYPES.MULTIPLE_CHOICE)
    .isArray({ min: 2 }),
  body('order').optional().isInt({ min: 0 }),
];
