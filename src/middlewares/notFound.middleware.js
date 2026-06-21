import { AppError } from '../utils/AppError.js';
import { HTTP_STATUS } from '../utils/httpStatus.js';

export function notFoundHandler(request, response, next) {
  next(new AppError(`Route not found: ${request.originalUrl}`, HTTP_STATUS.NOT_FOUND));
}
