import { Career } from '../models/Career.model.js';
import { HTTP_STATUS } from '../utils/httpStatus.js';

export class CareerController {
  constructor(statsService) {
    this.statsService = statsService;
  }

  getStatistics = async (request, response) => {
    const { id } = request.params;

    const existingCareer = await Career.findById(id);
    if (!existingCareer) {
      response.status(HTTP_STATUS.NOT_FOUND).json({
        message: 'Career not found',
      });
      return;
    }

    const careerStatistics = await this.statsService.getCareerStatistics(id);

    response.status(HTTP_STATUS.OK).json({
      careerName: existingCareer.name,
      statistics: careerStatistics,
    });
  };
}
