import { Faculty } from '../models/Faculty.model.js';
import { Career } from '../models/Career.model.js';
import { StatsService } from '../services/stats.service.js';

function filterByDuration(careers, durationType, index, accumulator) {
  if (index >= careers.length) return accumulator;

  const currentCareer = careers[index];
  const isShortCareer = currentCareer.durationYears < 4;

  if (durationType === 'short' && isShortCareer) {
    accumulator.push(currentCareer);
  } else if (durationType === 'long' && !isShortCareer) {
    accumulator.push(currentCareer);
  }

  return filterByDuration(careers, durationType, index + 1, accumulator);
}

const statsService = new StatsService();

export async function getAllFaculties() {
  return Faculty.find();
}

export async function getCareersByFaculty(facultyId) {
  return Career.find({ facultyId });
}

export async function getCareerById(careerId) {
  return Career.findById(careerId).populate('facultyId');
}

export async function getCareersByDuration(durationType) {
  const allCareers = await Career.find();
  return filterByDuration(allCareers, durationType, 0, []);
}

export async function getCareerStatistics(careerId) {
  return statsService.getCareerStatistics(careerId);
}
