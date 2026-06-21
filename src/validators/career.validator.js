import { param } from 'express-validator';

export const careerStatsValidation = [
  param('id').isMongoId(),
];
