import { Router } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { validate } from '../../middlewares/validation.middleware.js';
import { careerStatsValidation } from '../../validators/career.validator.js';

export function createCareerRouter(careerController) {
  const router = Router();
  router.get('/:id/stats', validate(careerStatsValidation), catchAsync(careerController.getStatistics));
  return router;
}
