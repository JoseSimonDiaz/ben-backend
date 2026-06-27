import { HTTP_STATUS } from '../utils/httpStatus.js';

export class ChatController {
  constructor(aiService) {
    this.aiService = aiService;
  }

  handleMessage = async (request, response) => {
    const { message, history } = request.body;
    const result = await this.aiService.processMessage(message, history);

    response.status(HTTP_STATUS.OK).json(result);
  };
}
