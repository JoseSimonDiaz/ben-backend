import { HTTP_STATUS } from '../utils/httpStatus.js';

export class QuizController {
  constructor(matchingService) {
    this.matchingService = matchingService;
  }

  submit = async (request, response) => {
    const { answers, preferredDuration } = request.body;
    const matchResult = await this.matchingService.processSubmission(answers, preferredDuration);

    response.status(HTTP_STATUS.CREATED).json({
      careerId: matchResult.careerId,
      careerName: matchResult.careerName,
      matchPercentage: matchResult.matchPercentage,
    });
  };
}
