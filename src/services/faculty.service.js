import { Faculty } from '../models/Faculty.model.js';

export class FacultyService {
  async findAll() {
    return Faculty.find().sort({ name: 1 });
  }
}
