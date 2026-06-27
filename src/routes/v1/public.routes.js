import { Router } from 'express';
import { catchAsync } from '../utils/catchAsync.js';

export function createPublicRouter(publicController) {
  const router = Router();
  router.get('/questions', catchAsync(publicController.getQuestions));
  return router;
}
