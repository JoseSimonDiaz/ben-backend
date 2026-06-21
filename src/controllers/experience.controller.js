import { CareerExperience } from '../models/CareerExperience.model.js';
import { HTTP_STATUS } from '../utils/httpStatus.js';

export class ExperienceController {
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

    const existingExperience = await CareerExperience.findOne({
      careerId,
      collaboratorEmail,
    });

    if (existingExperience) {
      response.status(HTTP_STATUS.CONFLICT).json({
        message: 'You have already submitted an experience for this career',
      });
      return;
    }

    const createdExperience = await CareerExperience.create({
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
