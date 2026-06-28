import { Router } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';

export function createCareerRouter(careerController) {
  const router = Router();
  router.get('/:id/stats', catchAsync(careerController.getStatistics));
  return router;
}
