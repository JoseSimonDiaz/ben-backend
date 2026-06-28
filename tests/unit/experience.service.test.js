import { describe, it, expect, beforeAll, beforeEach, jest } from '@jest/globals';

const mockFindOne = jest.fn();
const mockCreate = jest.fn();

jest.unstable_mockModule('../../src/models/CareerExperience.model.js', () => ({
  CareerExperience: { findOne: mockFindOne, create: mockCreate },
}));

let ExperienceService;

beforeAll(async () => {
  const module = await import('../../src/services/experience.service.js');
  ExperienceService = module.ExperienceService;
});

describe('ExperienceService', () => {
  beforeEach(() => {
    mockFindOne.mockReset();
    mockCreate.mockReset();
  });

  it('findOne should call CareerExperience.findOne with correct args', async () => {
    const expectedResult = { _id: 'exp1', careerId: 'car1', collaboratorEmail: 'a@b.com' };
    mockFindOne.mockResolvedValue(expectedResult);

    const service = new ExperienceService();
    const result = await service.findOne('car1', 'a@b.com');

    expect(mockFindOne).toHaveBeenCalledWith({ careerId: 'car1', collaboratorEmail: 'a@b.com' });
    expect(result).toEqual(expectedResult);
  });

  it('create should call CareerExperience.create with correct args', async () => {
    const fields = {
      careerId: 'car1',
      collaboratorName: 'Alice',
      collaboratorEmail: 'alice@example.com',
    };
    const expectedResult = { _id: 'exp1', ...fields };
    mockCreate.mockResolvedValue(expectedResult);

    const service = new ExperienceService();
    const result = await service.create(fields);

    expect(mockCreate).toHaveBeenCalledWith(fields);
    expect(result).toEqual(expectedResult);
  });
});
