import { describe, it, expect, beforeAll, beforeEach, jest } from '@jest/globals';

const mockQuestionFind = jest.fn();
const mockCareerFind = jest.fn();
const mockQuizSessionCreate = jest.fn();

jest.unstable_mockModule('../../src/models/Question.model.js', () => ({
  Question: { find: mockQuestionFind },
}));

jest.unstable_mockModule('../../src/models/Career.model.js', () => ({
  Career: { find: mockCareerFind },
}));

jest.unstable_mockModule('../../src/models/QuizSession.model.js', () => ({
  QuizSession: { create: mockQuizSessionCreate },
}));

let MatchingService;

beforeAll(async () => {
  const module = await import('../../src/services/matching.service.js');
  MatchingService = module.MatchingService;
});

describe('MatchingService', () => {
  beforeEach(() => {
    mockQuestionFind.mockReset();
    mockCareerFind.mockReset();
    mockQuizSessionCreate.mockReset();
  });

  it('processSubmission should throw AppError when findBestCareer returns null', async () => {
    const answers = [
      { questionId: 'q1', selectedOptionIndex: 0 },
    ];
    const preferredDuration = 'long';

    const questions = [
      {
        _id: 'q1',
        questionType: 'multiple_choice',
        options: [{ score: { logical: 1, creative: 0, social: 0, investigative: 0 } }],
      },
    ];

    mockQuestionFind.mockResolvedValue(questions);

    mockCareerFind.mockResolvedValue([]);

    const service = new MatchingService();

    await expect(service.processSubmission(answers, preferredDuration)).rejects.toThrow(
      'No careers match the selected duration',
    );

    expect(mockQuizSessionCreate).not.toHaveBeenCalled();
  });
});
