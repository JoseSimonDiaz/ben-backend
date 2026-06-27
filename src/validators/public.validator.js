import { query } from 'express-validator';
import { QUESTION_TARGETS } from '../constants/domain.js';

export const publicQuestionsValidation = [
  query('target')
    .isIn(Object.values(QUESTION_TARGETS))
    .withMessage('target must be student or graduate'),
];
