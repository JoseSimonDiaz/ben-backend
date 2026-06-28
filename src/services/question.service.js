import { Question } from '../models/Question.model.js';

export class QuestionService {
  async findAll() {
    return Question.find().sort({ target: 1, order: 1 });
  }

  async findById(id) {
    return Question.findById(id);
  }

  async create(fields) {
    return Question.create(fields);
  }

  async update(id, fields) {
    return Question.findByIdAndUpdate(id, fields, { new: true, runValidators: true });
  }

  async deleteById(id) {
    return Question.findByIdAndDelete(id);
  }

  async findByTarget(target) {
    return Question.find({ target }).sort({ order: 1 });
  }
}
