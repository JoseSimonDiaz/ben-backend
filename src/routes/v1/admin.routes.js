import { Router } from 'express';
import { catchAsync } from '../utils/catchAsync.js';
import { validate } from '../../middlewares/validation.middleware.js';
import {
  mongoIdParam,
  facultyCreationValidation,
  facultyUpdateValidation,
  careerCreationValidation,
  careerUpdateValidation,
  questionCreationValidation,
} from '../../validators/admin.validator.js';

export function createAdminRouter(adminController) {
  const router = Router();

  router.get('/faculties', catchAsync(adminController.getAllFaculties));
  router.get('/faculties/:id', validate(mongoIdParam), catchAsync(adminController.getFacultyById));
  router.post('/faculties', validate(facultyCreationValidation), catchAsync(adminController.createFaculty));
  router.put('/faculties/:id', validate(mongoIdParam.concat(facultyUpdateValidation)), catchAsync(adminController.updateFaculty));
  router.delete('/faculties/:id', validate(mongoIdParam), catchAsync(adminController.deleteFaculty));

  router.get('/careers', catchAsync(adminController.getAllCareers));
  router.get('/careers/:id', validate(mongoIdParam), catchAsync(adminController.getCareerById));
  router.post('/careers', validate(careerCreationValidation), catchAsync(adminController.createCareer));
  router.put('/careers/:id', validate(mongoIdParam.concat(careerUpdateValidation)), catchAsync(adminController.updateCareer));
  router.delete('/careers/:id', validate(mongoIdParam), catchAsync(adminController.deleteCareer));
  router.post('/questions', validate(questionCreationValidation), catchAsync(adminController.createQuestion));

  return router;
}
