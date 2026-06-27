import { HTTP_STATUS } from '../utils/httpStatus.js';

export class AdminController {
  constructor(questionService, facultyService, careerService) {
    this.questionService = questionService;
    this.facultyService = facultyService;
    this.careerService = careerService;
  }

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

  getAllCareers = async (_request, response) => {
    const careers = await this.careerService.findAll();

    response.status(HTTP_STATUS.OK).json(careers);
  };

  getCareerById = async (request, response) => {
    const { id } = request.params;

    const career = await this.careerService.findById(id);

    if (!career) {
      response.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Career not found' });
      return;
    }

    response.status(HTTP_STATUS.OK).json(career);
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

  updateCareer = async (request, response) => {
    const { id } = request.params;
    const {
      facultyId,
      name,
      description,
      officialDuration,
      durationYears,
      keywords,
      requiredSkills,
    } = request.body;

    const updatedCareer = await this.careerService.update(id, {
      facultyId,
      name,
      description,
      officialDuration,
      durationYears,
      keywords,
      requiredSkills,
    });

    if (!updatedCareer) {
      response.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Career not found' });
      return;
    }

    response.status(HTTP_STATUS.OK).json(updatedCareer);
  };

  deleteCareer = async (request, response) => {
    const { id } = request.params;

    const deletedCareer = await this.careerService.deleteById(id);

    if (!deletedCareer) {
      response.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Career not found' });
      return;
    }

    response.status(HTTP_STATUS.NO_CONTENT).send();
  };

  getAllQuestions = async (_request, response) => {
    const questions = await this.questionService.findAll();

    response.status(HTTP_STATUS.OK).json(questions);
  };

  getQuestionById = async (request, response) => {
    const { id } = request.params;

    const question = await this.questionService.findById(id);

    if (!question) {
      response.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Question not found' });
      return;
    }

    response.status(HTTP_STATUS.OK).json(question);
  };

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

  updateQuestion = async (request, response) => {
    const { id } = request.params;
    const { questionText, category, options, order, target, questionType } = request.body;

    const updatedQuestion = await this.questionService.update(id, {
      questionText,
      category,
      options,
      order,
      target,
      questionType,
    });

    if (!updatedQuestion) {
      response.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Question not found' });
      return;
    }

    response.status(HTTP_STATUS.OK).json(updatedQuestion);
  };

  deleteQuestion = async (request, response) => {
    const { id } = request.params;

    const deletedQuestion = await this.questionService.deleteById(id);

    if (!deletedQuestion) {
      response.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Question not found' });
      return;
    }

    response.status(HTTP_STATUS.NO_CONTENT).send();
  };
}
