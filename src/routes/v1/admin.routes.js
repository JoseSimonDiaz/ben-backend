import { Router } from 'express';
import { catchAsync } from '../utils/catchAsync.js';

export function createAdminRouter(adminController) {
  const router = Router();
  router.post('/faculties', catchAsync(adminController.createFaculty));
  router.post('/careers', catchAsync(adminController.createCareer));
  router.post('/questions', catchAsync(adminController.createQuestion));
  return router;
}
