import { Router } from 'express';
import { catchAsync } from '../utils/catchAsync.js';
import { validate } from '../../middlewares/validation.middleware.js';
import {
  facultyCreationValidation,
  careerCreationValidation,
  questionCreationValidation,
} from '../../validators/admin.validator.js';

export function createAdminRouter(adminController) {
  const router = Router();
  router.post('/faculties', validate(facultyCreationValidation), catchAsync(adminController.createFaculty));
  router.post('/careers', validate(careerCreationValidation), catchAsync(adminController.createCareer));
  router.post('/questions', validate(questionCreationValidation), catchAsync(adminController.createQuestion));
  return router;
}
