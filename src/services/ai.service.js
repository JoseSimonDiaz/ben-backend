import Groq from 'groq-sdk';
import { decisionPrompt } from '../constants/prompts/decision.prompt.js';
import { formatterPrompt } from '../constants/prompts/formatter.prompt.js';
import { personalityPrompt } from '../constants/prompts/personality.prompt.js';
import {
  getAllFaculties,
  getCareersByFaculty,
  getCareerById,
  getCareersByDuration,
  getCareerStatistics,
} from '../tools/career.tools.js';
import {
  getExperiencesByCareer,
  getExperienceSummary,
} from '../tools/experience.tools.js';
import { AppError } from '../utils/AppError.js';
import { HTTP_STATUS } from '../utils/httpStatus.js';

const tools = {
  getAllFaculties,
  getCareersByFaculty,
  getCareerById,
  getCareersByDuration,
  getCareerStatistics,
  getExperiencesByCareer,
  getExperienceSummary,
};

export class AIService {
  constructor(apiKey) {
    this.groq = new Groq({ apiKey });
  }

  async processMessage(message, history = []) {
    const decision = await this.groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 0,
      messages: [
        { role: 'system', content: decisionPrompt },
        ...history,
        { role: 'user', content: message },
      ],
    });

    const content = decision.choices[0].message.content.trim();

    if (content.startsWith('TOOL:')) {
      return this.handleToolCall(content, history, message);
    }

    return this.handleFreeChat(history, message);
  }

  async handleToolCall(content, history, message) {
    const parts = content.replace('TOOL:', '').split(':');
    const toolName = parts[0].trim();
    const toolArg = parts[1] ? parts[1].trim() : null;

    const tool = tools[toolName];

    if (!tool) {
      throw new AppError(`Unknown tool: ${toolName}`, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    const result = await (toolArg ? tool(toolArg) : tool());

    const formatted = await this.groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 0,
      messages: [
        { role: 'system', content: formatterPrompt },
        ...history,
        { role: 'user', content: message },
        {
          role: 'user',
          content: `RESULT:\n${JSON.stringify(result, null, 2)}`,
        },
      ],
    });

    return { reply: formatted.choices[0].message.content };
  }

  async handleFreeChat(history, message) {
    const normal = await this.groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.6,
      messages: [
        { role: 'system', content: personalityPrompt },
        ...history,
        { role: 'user', content: message },
      ],
    });

    return { reply: normal.choices[0].message.content };
  }
}
