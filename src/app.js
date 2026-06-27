import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { QuizController } from './controllers/quiz.controller.js';
import { CareerController } from './controllers/career.controller.js';
import { ExperienceController } from './controllers/experience.controller.js';
import { AdminController } from './controllers/admin.controller.js';
import { ChatController } from './controllers/chat.controller.js';

import { MatchingService } from './services/matching.service.js';
import { StatsService } from './services/stats.service.js';
import { EmailService } from './services/email.service.js';
import { AIService } from './services/ai.service.js';
import { QuestionService } from './services/question.service.js';

import { createQuizRouter } from './routes/v1/quiz.routes.js';
import { createCareerRouter } from './routes/v1/career.routes.js';
import { createExperienceRouter } from './routes/v1/experience.routes.js';
import { createChatRouter } from './routes/v1/chat.routes.js';
import { createAdminRouter } from './routes/v1/admin.routes.js';

import { quizSubmissionValidation } from './validators/quiz.validator.js';
import { careerStatsValidation } from './validators/career.validator.js';
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

const emailService = new EmailService();
const matchingService = new MatchingService();
const statsService = new StatsService();
const aiService = new AIService(config.API_AGENT_IA_KEY);
const questionService = new QuestionService();

const quizController = new QuizController(matchingService, emailService);
const careerController = new CareerController(statsService);
const experienceController = new ExperienceController();
const adminController = new AdminController(questionService);
const chatController = new ChatController(aiService);

app.use('/api/v1/quiz', validate(quizSubmissionValidation), createQuizRouter(quizController));
app.use('/api/v1/careers', validate(careerStatsValidation), createCareerRouter(careerController));
app.use('/api/v1/experiences', validate(experienceSubmissionValidation), createExperienceRouter(experienceController));
app.use('/api/v1/chat', validate(chatValidation), createChatRouter(chatController));

app.use('/api/v1/admin', adminAuthentication, createAdminRouter(adminController));

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
