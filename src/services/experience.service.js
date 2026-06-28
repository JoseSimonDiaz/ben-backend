import { CareerExperience } from '../models/CareerExperience.model.js';

export class ExperienceService {
  async findOne(careerId, collaboratorEmail) {
    return CareerExperience.findOne({ careerId, collaboratorEmail });
  }

  async create(fields) {
    return CareerExperience.create(fields);
  }
}
