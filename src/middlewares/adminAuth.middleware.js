import { HTTP_STATUS } from '../utils/httpStatus.js';
import { config } from '../config/index.js';

export function adminAuthentication(request, response, next) {
  const providedKey = request.headers['x-api-key'];

  if (providedKey !== config.ADMIN_API_KEY) {
    response.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: 'Invalid or missing API key',
    });
    return;
  }

  next();
}
