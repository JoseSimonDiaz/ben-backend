import { Router } from 'express';
import { catchAsync } from '../utils/catchAsync.js';

export function createQuizRouter(quizController) {
  const router = Router();
  router.post('/submit', catchAsync(quizController.submit));
  return router;
}
