import { Career } from '../models/Career.model.js';

export class CareerService {
  async findAll() {
    return Career.find().populate('facultyId', 'name').sort({ name: 1 });
  }

  async findById(id) {
    return Career.findById(id).populate('facultyId', 'name');
  }

  async create(fields) {
    return Career.create(fields);
  }

  async update(id, fields) {
    return Career.findByIdAndUpdate(id, fields, { new: true, runValidators: true }).populate('facultyId', 'name');
  }

  async deleteById(id) {
    return Career.findByIdAndDelete(id);
  }
}
