import { Question } from '../models/Question.model.js';

export class QuestionService {
  async create(fields) {
    return Question.create(fields);
  }
}
