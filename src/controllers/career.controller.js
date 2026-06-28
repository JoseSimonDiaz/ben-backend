import { HTTP_STATUS } from '../utils/httpStatus.js';

export class CareerController {
  constructor(statsService, careerService) {
    this.statsService = statsService;
    this.careerService = careerService;
  }

  getStatistics = async (request, response) => {
    const { id } = request.params;

    const existingCareer = await this.careerService.findById(id);
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
