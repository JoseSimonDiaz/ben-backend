import { HTTP_STATUS } from '../utils/httpStatus.js';

export class PublicController {
  constructor(questionService, facultyService) {
    this.questionService = questionService;
    this.facultyService = facultyService;
  }

  getQuestions = async (request, response) => {
    const { target } = request.query;

    const questions = await this.questionService.findByTarget(target);

    response.status(HTTP_STATUS.OK).json(questions);
  };

  getFaculties = async (_request, response) => {
    const faculties = await this.facultyService.findAll();

    response.status(HTTP_STATUS.OK).json(faculties);
  };
}
