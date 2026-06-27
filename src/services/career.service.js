import { Career } from '../models/Career.model.js';

export class CareerService {
  async findAll() {
    return Career.find().populate('facultyId', 'name').sort({ name: 1 });
  }
}
