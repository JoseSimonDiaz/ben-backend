import { Router } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { validate } from '../../middlewares/validation.middleware.js';
import { publicQuestionsValidation } from '../../validators/public.validator.js';

export function createPublicRouter(publicController) {
  const router = Router();
  router.get('/questions', validate(publicQuestionsValidation), catchAsync(publicController.getQuestions));
  router.get('/careers', catchAsync(publicController.getCareers));
  return router;
}
