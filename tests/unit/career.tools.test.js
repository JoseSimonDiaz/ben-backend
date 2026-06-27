import { describe, it, expect, beforeAll, beforeEach, jest } from '@jest/globals';

const mockStatsInstance = { getCareerStatistics: jest.fn() };

jest.unstable_mockModule('../../src/services/stats.service.js', () => ({
  StatsService: jest.fn(() => mockStatsInstance),
}));

jest.unstable_mockModule('../../src/models/CareerExperience.model.js', () => ({}));

const mockFacultyFind = jest.fn();

jest.unstable_mockModule('../../src/models/Faculty.model.js', () => ({
  Faculty: { find: mockFacultyFind },
}));

const mockCareerFind = jest.fn();
const mockCareerFindById = jest.fn();

jest.unstable_mockModule('../../src/models/Career.model.js', () => ({
  Career: { findById: mockCareerFindById, find: mockCareerFind },
}));

let getAllFaculties;
let getCareerById;

beforeAll(async () => {
  const tools = await import('../../src/tools/career.tools.js');
  getAllFaculties = tools.getAllFaculties;
  getCareerById = tools.getCareerById;
});

describe('Career Tools', () => {
  beforeEach(() => {
    mockFacultyFind.mockReset();
    mockCareerFindById.mockReset();
    mockCareerFind.mockReset();
  });

  it('should return all faculties from getAllFaculties', async () => {
    const expectedFaculties = [
      { _id: 'fac1', name: 'Engineering' },
      { _id: 'fac2', name: 'Sciences' },
    ];
    mockFacultyFind.mockResolvedValue(expectedFaculties);

    const result = await getAllFaculties();

    expect(result).toEqual(expectedFaculties);
    expect(mockFacultyFind).toHaveBeenCalledTimes(1);
  });

  it('should return a career from getCareerById when the career exists', async () => {
    const expectedCareer = { _id: 'car1', name: 'Computer Science' };
    const mockQuery = { populate: jest.fn().mockResolvedValue(expectedCareer) };
    mockCareerFindById.mockReturnValue(mockQuery);

    const result = await getCareerById('car1');

    expect(result).toEqual(expectedCareer);
    expect(mockCareerFindById).toHaveBeenCalledWith('car1');
    expect(mockQuery.populate).toHaveBeenCalledWith('facultyId');
  });

  it('should return null from getCareerById when the career does not exist', async () => {
    const mockQuery = { populate: jest.fn().mockResolvedValue(null) };
    mockCareerFindById.mockReturnValue(mockQuery);

    const result = await getCareerById('nonexistent-id');

    expect(result).toBeNull();
    expect(mockCareerFindById).toHaveBeenCalledWith('nonexistent-id');
    expect(mockQuery.populate).toHaveBeenCalledWith('facultyId');
  });
});
