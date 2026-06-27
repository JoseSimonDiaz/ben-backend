import { HTTP_STATUS } from '../utils/httpStatus.js';

export class PublicController {
  constructor(questionService) {
    this.questionService = questionService;
  }

  getQuestions = async (request, response) => {
    const { target } = request.query;

    const questions = await this.questionService.findByTarget(target);

    response.status(HTTP_STATUS.OK).json(questions);
  };
}
