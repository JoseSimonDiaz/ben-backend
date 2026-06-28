import { HTTP_STATUS } from '../utils/httpStatus.js';

export class ExperienceController {
  constructor(experienceService) {
    this.experienceService = experienceService;
  }

  submit = async (request, response) => {
    const {
      careerId,
      collaboratorName,
      collaboratorEmail,
      graduationYear,
      actualCompletionTime,
      perceivedDropoutRate,
      hardestSubjects,
      jobProspects,
      reviewText,
    } = request.body;

    const existingExperience = await this.experienceService.findOne(careerId, collaboratorEmail);

    if (existingExperience) {
      response.status(HTTP_STATUS.CONFLICT).json({
        message: 'You have already submitted an experience for this career',
      });
      return;
    }

    const createdExperience = await this.experienceService.create({
      careerId,
      collaboratorName,
      collaboratorEmail,
      graduationYear,
      actualCompletionTime,
      perceivedDropoutRate,
      hardestSubjects,
      jobProspects,
      reviewText,
    });

    response.status(HTTP_STATUS.CREATED).json(createdExperience);
  };
}
