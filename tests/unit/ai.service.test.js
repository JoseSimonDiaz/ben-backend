import { describe, it, expect, beforeAll, beforeEach, jest } from '@jest/globals';

const mockGroqCreate = jest.fn();
const mockGroqConstructor = jest.fn(function GroqMock(config) {
  this.apiKey = config.apiKey;
  this.chat = { completions: { create: mockGroqCreate } };
});

jest.unstable_mockModule('groq-sdk', () => ({
  default: mockGroqConstructor,
}));

jest.unstable_mockModule('../../src/constants/prompts/decision.prompt.js', () => ({
  decisionPrompt: 'mock decision prompt',
}));

jest.unstable_mockModule('../../src/constants/prompts/formatter.prompt.js', () => ({
  formatterPrompt: 'mock formatter prompt',
}));

jest.unstable_mockModule('../../src/constants/prompts/personality.prompt.js', () => ({
  personalityPrompt: 'mock personality prompt',
}));

jest.unstable_mockModule('../../src/tools/career.tools.js', () => ({
  getAllFaculties: jest.fn(),
  getCareersByFaculty: jest.fn(),
  getCareerById: jest.fn(),
  getCareersByDuration: jest.fn(),
  getCareerStatistics: jest.fn(),
}));

let AIService;

beforeAll(async () => {
  const module = await import('../../src/services/ai.service.js');
  AIService = module.AIService;
});

describe('AIService', () => {
  beforeEach(() => {
    mockGroqCreate.mockReset();
    mockGroqConstructor.mockClear();
  });

  it('should create the Groq client with the provided apiKey', () => {
    const apiKey = 'sk-test-key-12345';
    const service = new AIService(apiKey);

    expect(mockGroqConstructor).toHaveBeenCalledWith({ apiKey });
    expect(service.groq).toBeDefined();
    expect(service.groq.apiKey).toBe(apiKey);
  });

  it('should process a message without history and return a reply via free chat', async () => {
    const service = new AIService('sk-test-key');

    mockGroqCreate
      .mockResolvedValueOnce({
        choices: [{ message: { content: 'NO_TOOL' } }],
      })
      .mockResolvedValueOnce({
        choices: [{ message: { content: 'Te recomiendo explorar Ingeniería Informática.' } }],
      });

    const result = await service.processMessage('¿Qué carrera me recomiendas?');

    expect(result).toEqual({ reply: 'Te recomiendo explorar Ingeniería Informática.' });
    expect(mockGroqCreate).toHaveBeenCalledTimes(2);
  });

  it('should process a message with history and return a reply via free chat', async () => {
    const service = new AIService('sk-test-key');
    const history = [
      { role: 'user', content: 'Me gustan las matemáticas.' },
      { role: 'assistant', content: '¡Excelente! Las matemáticas son fundamentales.' },
    ];

    mockGroqCreate
      .mockResolvedValueOnce({
        choices: [{ message: { content: 'NO_TOOL' } }],
      })
      .mockResolvedValueOnce({
        choices: [{ message: { content: 'Te sugiero considerar Ciencias de la Computación.' } }],
      });

    const result = await service.processMessage(
      '¿Qué carreras usan matemáticas?',
      history,
    );

    expect(result).toEqual({ reply: 'Te sugiero considerar Ciencias de la Computación.' });
    expect(mockGroqCreate).toHaveBeenCalledTimes(2);
  });
});
