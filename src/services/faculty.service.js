import { Faculty } from '../models/Faculty.model.js';

export class FacultyService {
  async findAll() {
    return Faculty.find().sort({ name: 1 });
  }

  async findById(id) {
    return Faculty.findById(id);
  }

  async create(fields) {
    return Faculty.create(fields);
  }

  async update(id, fields) {
    return Faculty.findByIdAndUpdate(id, fields, { new: true, runValidators: true });
  }

  async deleteById(id) {
    return Faculty.findByIdAndDelete(id);
  }
}
