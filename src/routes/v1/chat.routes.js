import { Router } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';

export function createChatRouter(chatController) {
  const router = Router();
  router.post('/', catchAsync(chatController.handleMessage));
  return router;
}
