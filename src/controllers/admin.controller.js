import { HTTP_STATUS } from '../utils/httpStatus.js';

export class AdminController {
  constructor(questionService, facultyService, careerService) {
    this.questionService = questionService;
    this.facultyService = facultyService;
    this.careerService = careerService;
  }

  // --- Faculties ---

  getAllFaculties = async (_request, response) => {
    const faculties = await this.facultyService.findAll();

    response.status(HTTP_STATUS.OK).json(faculties);
  };

  getFacultyById = async (request, response) => {
    const { id } = request.params;

    const faculty = await this.facultyService.findById(id);

    if (!faculty) {
      response.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Faculty not found' });
      return;
    }

    response.status(HTTP_STATUS.OK).json(faculty);
  };

  createFaculty = async (request, response) => {
    const { name, description } = request.body;

    const createdFaculty = await this.facultyService.create({ name, description });

    response.status(HTTP_STATUS.CREATED).json(createdFaculty);
  };

  updateFaculty = async (request, response) => {
    const { id } = request.params;
    const { name, description } = request.body;

    const updatedFaculty = await this.facultyService.update(id, { name, description });

    if (!updatedFaculty) {
      response.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Faculty not found' });
      return;
    }

    response.status(HTTP_STATUS.OK).json(updatedFaculty);
  };

  deleteFaculty = async (request, response) => {
    const { id } = request.params;

    const deletedFaculty = await this.facultyService.deleteById(id);

    if (!deletedFaculty) {
      response.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Faculty not found' });
      return;
    }

    response.status(HTTP_STATUS.NO_CONTENT).send();
  };

  // --- Careers ---

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

    const createdCareer = await this.careerService.create({
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

  // --- Questions ---

  createQuestion = async (request, response) => {
    const { questionText, category, options, order, target, questionType } = request.body;

    const createdQuestion = await this.questionService.create({
      questionText,
      category,
      options,
      order,
      target,
      questionType,
    });

    response.status(HTTP_STATUS.CREATED).json(createdQuestion);
  };
}
