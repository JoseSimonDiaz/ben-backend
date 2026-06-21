import { HTTP_STATUS } from '../utils/httpStatus.js';

export class QuizController {
  constructor(matchingService, emailService) {
    this.matchingService = matchingService;
    this.emailService = emailService;
  }

  submit = async (request, response) => {
    const { answers, preferredDuration, email } = request.body;
    const matchResult = await this.matchingService.processSubmission(answers, preferredDuration);

    if (email) {
      this.emailService.sendFollowUp(email, matchResult.careerName);
    }

    response.status(HTTP_STATUS.CREATED).json({
      careerId: matchResult.careerId,
      careerName: matchResult.careerName,
      matchPercentage: matchResult.matchPercentage,
    });
  };
}
