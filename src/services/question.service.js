import { Question } from '../models/Question.model.js';

export class QuestionService {
  async create(fields) {
    return Question.create(fields);
  }

  async findByTarget(target) {
    return Question.find({ target }).sort({ order: 1 });
  }
}
