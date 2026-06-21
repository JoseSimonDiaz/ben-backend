import { Faculty } from '../models/Faculty.model.js';
import { Career } from '../models/Career.model.js';
import { Question } from '../models/Question.model.js';
import { HTTP_STATUS } from '../utils/httpStatus.js';

export class AdminController {
  createFaculty = async (request, response) => {
    const { name, description } = request.body;
    const createdFaculty = await Faculty.create({ name, description });

    response.status(HTTP_STATUS.CREATED).json(createdFaculty);
  };

  createCareer = async (request, response) => {
    const {
      facultyId,
      name,
      description,
      officialDuration,
      durationYears,
      keywords,
      requiredSkills,
    } = request.body;

    const createdCareer = await Career.create({
      facultyId,
      name,
      description,
      officialDuration,
      durationYears,
      keywords,
      requiredSkills,
    });

    response.status(HTTP_STATUS.CREATED).json(createdCareer);
  };

  createQuestion = async (request, response) => {
    const { questionText, category, options, order } = request.body;
    const createdQuestion = await Question.create({
      questionText,
      category,
      options,
      order,
    });

    response.status(HTTP_STATUS.CREATED).json(createdQuestion);
  };
}
