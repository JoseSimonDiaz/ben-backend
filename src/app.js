import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { QuizController } from './controllers/quiz.controller.js';
import { CareerController } from './controllers/career.controller.js';
import { ExperienceController } from './controllers/experience.controller.js';
import { AdminController } from './controllers/admin.controller.js';
import { ChatController } from './controllers/chat.controller.js';
import { PublicController } from './controllers/public.controller.js';

import { MatchingService } from './services/matching.service.js';
import { StatsService } from './services/stats.service.js';
import { AIService } from './services/ai.service.js';
import { QuestionService } from './services/question.service.js';
import { CareerService } from './services/career.service.js';
import { ExperienceService } from './services/experience.service.js';

import { createQuizRouter } from './routes/v1/quiz.routes.js';
import { createCareerRouter } from './routes/v1/career.routes.js';
import { createExperienceRouter } from './routes/v1/experience.routes.js';
import { createChatRouter } from './routes/v1/chat.routes.js';
import { createAdminRouter } from './routes/v1/admin.routes.js';
import { createPublicRouter } from './routes/v1/public.routes.js';

import { quizSubmissionValidation } from './validators/quiz.validator.js';
import { experienceSubmissionValidation } from './validators/experience.validator.js';
import { chatValidation } from './validators/chat.validator.js';

import { validate } from './middlewares/validation.middleware.js';
import { adminAuthentication } from './middlewares/adminAuth.middleware.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import { notFoundHandler } from './middlewares/notFound.middleware.js';

import { config } from './config/index.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const matchingService = new MatchingService();
const statsService = new StatsService();
const aiService = new AIService(config.API_AGENT_IA_KEY);
const questionService = new QuestionService();
const careerService = new CareerService();
const experienceService = new ExperienceService();

const quizController = new QuizController(matchingService);
const careerController = new CareerController(statsService, careerService);
const experienceController = new ExperienceController(experienceService);
const adminController = new AdminController(questionService, careerService, statsService);
const chatController = new ChatController(aiService);
const publicController = new PublicController(questionService, careerService);

app.use('/api/v1/quiz', validate(quizSubmissionValidation), createQuizRouter(quizController));
app.use('/api/v1/careers', createCareerRouter(careerController));
app.use('/api/v1/experiences', validate(experienceSubmissionValidation), createExperienceRouter(experienceController));
app.use('/api/v1/chat', validate(chatValidation), createChatRouter(chatController));
app.use('/api/v1', createPublicRouter(publicController));

app.use('/api/v1/admin', adminAuthentication, createAdminRouter(adminController));

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
