import { validationResult } from 'express-validator';
import { HTTP_STATUS } from '../utils/httpStatus.js';

function runValidations(rules, request, index) {
  if (index >= rules.length) return Promise.resolve();

  return rules[index].run(request).then(() => {
    return runValidations(rules, request, index + 1);
  });
}

export function validate(rules) {
  return async (request, response, next) => {
    await runValidations(rules, request, 0);

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      response.status(HTTP_STATUS.BAD_REQUEST).json({
        message: errors.array()[0].msg,
      });
      return;
    }

    next();
  };
}
