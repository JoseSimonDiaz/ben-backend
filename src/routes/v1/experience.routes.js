import { Router } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';

export function createExperienceRouter(experienceController) {
  const router = Router();
  router.post('/', catchAsync(experienceController.submit));
  return router;
}
