import { describe, it, expect, beforeAll, beforeEach, jest } from '@jest/globals';

const mockStatsInstance = { getCareerStatistics: jest.fn() };

jest.unstable_mockModule('../../src/services/stats.service.js', () => ({
  StatsService: jest.fn(() => mockStatsInstance),
}));

const mockCareerFind = jest.fn();
const mockCareerFindById = jest.fn();

jest.unstable_mockModule('../../src/models/Career.model.js', () => ({
  Career: { findById: mockCareerFindById, find: mockCareerFind },
}));

let getCareerById;

beforeAll(async () => {
  const tools = await import('../../src/tools/career.tools.js');
  getCareerById = tools.getCareerById;
});

describe('Career Tools', () => {
  beforeEach(() => {
    mockCareerFindById.mockReset();
    mockCareerFind.mockReset();
  });

  it('should return a career from getCareerById when the career exists', async () => {
    const expectedCareer = { _id: 'car1', name: 'Computer Science' };
    mockCareerFindById.mockResolvedValue(expectedCareer);

    const result = await getCareerById('car1');

    expect(result).toEqual(expectedCareer);
    expect(mockCareerFindById).toHaveBeenCalledWith('car1');
  });

  it('should return null from getCareerById when the career does not exist', async () => {
    mockCareerFindById.mockResolvedValue(null);

    const result = await getCareerById('nonexistent-id');

    expect(result).toBeNull();
    expect(mockCareerFindById).toHaveBeenCalledWith('nonexistent-id');
  });
});
