import { Router } from 'express';
import { catchAsync } from '../utils/catchAsync.js';
import { validate } from '../../middlewares/validation.middleware.js';
import {
  mongoIdParam,
  facultyCreationValidation,
  facultyUpdateValidation,
  careerCreationValidation,
  questionCreationValidation,
} from '../../validators/admin.validator.js';

export function createAdminRouter(adminController) {
  const router = Router();

  router.get('/faculties', catchAsync(adminController.getAllFaculties));
  router.get('/faculties/:id', validate(mongoIdParam), catchAsync(adminController.getFacultyById));
  router.post('/faculties', validate(facultyCreationValidation), catchAsync(adminController.createFaculty));
  router.put('/faculties/:id', validate(mongoIdParam.concat(facultyUpdateValidation)), catchAsync(adminController.updateFaculty));
  router.delete('/faculties/:id', validate(mongoIdParam), catchAsync(adminController.deleteFaculty));

  router.post('/careers', validate(careerCreationValidation), catchAsync(adminController.createCareer));
  router.post('/questions', validate(questionCreationValidation), catchAsync(adminController.createQuestion));

  return router;
}
