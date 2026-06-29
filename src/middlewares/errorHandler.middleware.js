import { AppError } from '../utils/AppError.js';
import { HTTP_STATUS } from '../utils/httpStatus.js';
import { MONGOOSE_ERRORS, NODE_ENVIRONMENTS, BUILT_IN_ERRORS } from '../utils/errorTypes.js';
import { config } from '../config/index.js';

function handleCastError(error) {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, HTTP_STATUS.BAD_REQUEST);
}

function handleDuplicateKeyError(error) {
  const fields = extractKeyFields(error.keyValue, 0, []);
  const message = `Duplicate value for: ${fields}`;
  return new AppError(message, HTTP_STATUS.CONFLICT);
}

function extractKeyFields(keyValue, index, accumulator) {
  const keys = Object.keys(keyValue);
  if (index >= keys.length) return accumulator.join(', ');
  accumulator.push(keys[index]);
  return extractKeyFields(keyValue, index + 1, accumulator);
}

function handleValidationError(error) {
  const entries = Object.entries(error.errors);
  const messages = collectValidationMessages(entries, 0, []);
  return new AppError(messages, HTTP_STATUS.BAD_REQUEST);
}

function collectValidationMessages(entries, index, accumulator) {
  if (index >= entries.length) return accumulator.join(', ');
  accumulator.push(entries[index][1].message);
  return collectValidationMessages(entries, index + 1, accumulator);
}

function sendErrorDevelopment(error, request, response) {
  const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  response.status(statusCode).json({
    message: error.message || 'Unknown error',
    stack: error.stack,
  });
}

function sendErrorProduction(error, request, response) {
  const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

  if (error.isOperational) {
    response.status(statusCode).json({
      message: error.message,
    });
    return;
  }

  response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: 'Internal server error',
  });
}

export function errorHandler(error, request, response, _next) {
  let processedError = error;

  if (error.name === MONGOOSE_ERRORS.CAST_ERROR) {
    processedError = handleCastError(error);
  }

  if (error.code === MONGOOSE_ERRORS.DUPLICATE_KEY_CODE) {
    processedError = handleDuplicateKeyError(error);
  }

  if (error.name === MONGOOSE_ERRORS.VALIDATION_ERROR) {
    processedError = handleValidationError(error);
  }

  if (error instanceof BUILT_IN_ERRORS.SYNTAX_ERROR && error.status === HTTP_STATUS.BAD_REQUEST && 'body' in error) {
    processedError = new AppError('Invalid JSON payload', HTTP_STATUS.BAD_REQUEST);
  }

  if (config.NODE_ENVIRONMENT === NODE_ENVIRONMENTS.DEVELOPMENT) {
    sendErrorDevelopment(processedError, request, response);
    return;
  }

  sendErrorProduction(processedError, request, response);
}
