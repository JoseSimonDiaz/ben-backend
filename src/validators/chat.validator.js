import { body } from 'express-validator';

export const chatValidation = [
  body('message').isString().notEmpty(),
  body('history').optional().isArray(),
];
