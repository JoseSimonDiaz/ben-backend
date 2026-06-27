import { describe, it, expect, jest } from '@jest/globals';
import express from 'express';
import { createServer } from 'http';
import { request } from 'http';
import { body } from 'express-validator';

import { ChatController } from '../../src/controllers/chat.controller.js';
import { validate } from '../../src/middlewares/validation.middleware.js';
import { HTTP_STATUS } from '../../src/utils/httpStatus.js';

const chatMessageValidation = [
  body('message').isString().notEmpty().withMessage('Message is required'),
  body('history').optional().isArray().withMessage('History must be an array'),
];

function errorHandler(error, _request, response, _next) {
  const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  response.status(statusCode).json({ message: error.message });
}

function buildApp(chatController) {
  const app = express();
  app.use(express.json());
  app.post('/api/v1/chat', validate(chatMessageValidation), async (request, response, next) => {
    try {
      await chatController.handleMessage(request, response);
    } catch (error) {
      next(error);
    }
  });
  app.use(errorHandler);
  return app;
}

function sendRequest(app, method, path, bodyPayload) {
  return new Promise((resolve, reject) => {
    const server = createServer(app);

    server.listen(0, () => {
      const address = server.address();
      const port = address.port;

      const options = {
        hostname: '127.0.0.1',
        port,
        path,
        method: method || 'GET',
        headers: { 'Content-Type': 'application/json' },
      };

      const req = request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          server.close();
          let parsedBody = null;
          try {
            parsedBody = JSON.parse(data);
          } catch {
            parsedBody = data;
          }
          resolve({
            statusCode: res.statusCode,
            body: parsedBody,
          });
        });
      });

      req.on('error', (err) => {
        server.close();
        reject(err);
      });

      if (bodyPayload !== undefined) {
        req.write(JSON.stringify(bodyPayload));
      }
      req.end();
    });
  });
}

describe('Chat Routes — integration', () => {
  it('should respond with 200 and a reply for a valid request with message and history', async () => {
    const mockAiService = { processMessage: jest.fn() };
    mockAiService.processMessage.mockResolvedValue({ reply: 'Te recomiendo Ingeniería.' });

    const chatController = new ChatController(mockAiService);
    const app = buildApp(chatController);

    const response = await sendRequest(app, 'POST', '/api/v1/chat', {
      message: '¿Qué carrera me recomiendas?',
      history: [],
    });

    expect(response.statusCode).toBe(HTTP_STATUS.OK);
    expect(response.body).toEqual({ reply: 'Te recomiendo Ingeniería.' });
    expect(mockAiService.processMessage).toHaveBeenCalledWith(
      '¿Qué carrera me recomiendas?',
      [],
    );
  });

  it('should respond with 400 when message is missing from the body', async () => {
    const mockAiService = { processMessage: jest.fn() };
    const chatController = new ChatController(mockAiService);
    const app = buildApp(chatController);

    const response = await sendRequest(app, 'POST', '/api/v1/chat', {
      history: [],
    });

    expect(response.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.body).toHaveProperty('message');
    expect(mockAiService.processMessage).not.toHaveBeenCalled();
  });

  it('should respond with 400 when history is not an array', async () => {
    const mockAiService = { processMessage: jest.fn() };
    const chatController = new ChatController(mockAiService);
    const app = buildApp(chatController);

    const response = await sendRequest(app, 'POST', '/api/v1/chat', {
      message: 'Hello',
      history: 'invalid-string',
    });

    expect(response.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.body).toHaveProperty('message');
    expect(mockAiService.processMessage).not.toHaveBeenCalled();
  });
});
