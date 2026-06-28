import { describe, it, expect, jest } from '@jest/globals';
import { CareerController } from '../../src/controllers/career.controller.js';
import { HTTP_STATUS } from '../../src/utils/httpStatus.js';

describe('CareerController', () => {
  it('should return 200 with career name and statistics', async () => {
    const mockStatsService = { getCareerStatistics: jest.fn() };
    const mockCareerService = { findById: jest.fn() };
    const controller = new CareerController(mockStatsService, mockCareerService);
    const request = { params: { id: 'car1' } };
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    mockCareerService.findById.mockResolvedValue({ _id: 'car1', name: 'Computer Science' });
    mockStatsService.getCareerStatistics.mockResolvedValue({
      averageDropoutRate: 15.5,
      totalExperiences: 12,
      topDifficultSubjects: [],
      commonJobProspects: [],
      insufficientData: false,
    });

    await controller.getStatistics(request, response);

    expect(mockCareerService.findById).toHaveBeenCalledWith('car1');
    expect(mockStatsService.getCareerStatistics).toHaveBeenCalledWith('car1');
    expect(response.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(response.json).toHaveBeenCalledWith({
      careerName: 'Computer Science',
      statistics: {
        averageDropoutRate: 15.5,
        totalExperiences: 12,
        topDifficultSubjects: [],
        commonJobProspects: [],
        insufficientData: false,
      },
    });
  });

  it('should return 404 when career is not found', async () => {
    const mockStatsService = { getCareerStatistics: jest.fn() };
    const mockCareerService = { findById: jest.fn() };
    const controller = new CareerController(mockStatsService, mockCareerService);
    const request = { params: { id: 'nonexistent' } };
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    mockCareerService.findById.mockResolvedValue(null);

    await controller.getStatistics(request, response);

    expect(mockCareerService.findById).toHaveBeenCalledWith('nonexistent');
    expect(mockStatsService.getCareerStatistics).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
    expect(response.json).toHaveBeenCalledWith({ message: 'Career not found' });
  });
});
