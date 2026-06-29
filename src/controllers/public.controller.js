import { HTTP_STATUS } from '../utils/httpStatus.js';

export class PublicController {
  constructor(questionService, careerService) {
    this.questionService = questionService;
    this.careerService = careerService;
  }

  getQuestions = async (request, response) => {
    const { target } = request.query;

    const questions = await this.questionService.findByTarget(target);

    response.status(HTTP_STATUS.OK).json(questions);
  };

  getCareers = async (_request, response) => {
    const careers = await this.careerService.findAll();

    response.status(HTTP_STATUS.OK).json(careers);
  };
}
