import { describe, it, expect, jest } from '@jest/globals';
import { ChatController } from '../../src/controllers/chat.controller.js';
import { HTTP_STATUS } from '../../src/utils/httpStatus.js';

describe('ChatController', () => {
  it('should return 200 with the reply from the AI service', async () => {
    const mockAiService = { processMessage: jest.fn() };
    const controller = new ChatController(mockAiService);
    const request = { body: { message: 'Hello', history: [] } };
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    mockAiService.processMessage.mockResolvedValue({ reply: 'Hi there!' });

    await controller.handleMessage(request, response);

    expect(response.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(response.json).toHaveBeenCalledWith({ reply: 'Hi there!' });
    expect(mockAiService.processMessage).toHaveBeenCalledWith('Hello', []);
  });

  it('should propagate errors thrown by the AI service', async () => {
    const mockAiService = { processMessage: jest.fn() };
    const controller = new ChatController(mockAiService);
    const request = { body: { message: 'Hello' } };
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const error = new Error('AI service unavailable');
    mockAiService.processMessage.mockRejectedValue(error);

    await expect(controller.handleMessage(request, response)).rejects.toThrow(
      'AI service unavailable',
    );
  });
});
