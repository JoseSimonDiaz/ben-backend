import { describe, it, expect, jest } from '@jest/globals';
import { ExperienceController } from '../../src/controllers/experience.controller.js';
import { HTTP_STATUS } from '../../src/utils/httpStatus.js';

describe('ExperienceController', () => {
  const validBody = {
    careerId: 'car1',
    collaboratorName: 'Alice',
    collaboratorEmail: 'alice@example.com',
    graduationYear: 2023,
    actualCompletionTime: 5,
    perceivedDropoutRate: 20,
    hardestSubjects: [{ name: 'Math' }],
    jobProspects: [{ title: 'Developer' }],
    reviewText: 'Great career',
  };

  it('should return 201 with created experience when no duplicate exists', async () => {
    const mockExperienceService = {
      findOne: jest.fn(),
      create: jest.fn(),
    };
    const controller = new ExperienceController(mockExperienceService);
    const request = { body: validBody };
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    mockExperienceService.findOne.mockResolvedValue(null);
    const created = { _id: 'exp1', ...validBody };
    mockExperienceService.create.mockResolvedValue(created);

    await controller.submit(request, response);

    expect(mockExperienceService.findOne).toHaveBeenCalledWith('car1', 'alice@example.com');
    expect(mockExperienceService.create).toHaveBeenCalledWith(validBody);
    expect(response.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
    expect(response.json).toHaveBeenCalledWith(created);
  });

  it('should return 409 when a duplicate experience exists', async () => {
    const mockExperienceService = {
      findOne: jest.fn(),
      create: jest.fn(),
    };
    const controller = new ExperienceController(mockExperienceService);
    const request = { body: validBody };
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    mockExperienceService.findOne.mockResolvedValue({ _id: 'existing1' });

    await controller.submit(request, response);

    expect(mockExperienceService.findOne).toHaveBeenCalledWith('car1', 'alice@example.com');
    expect(mockExperienceService.create).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(HTTP_STATUS.CONFLICT);
    expect(response.json).toHaveBeenCalledWith({
      message: 'You have already submitted an experience for this career',
    });
  });
});
