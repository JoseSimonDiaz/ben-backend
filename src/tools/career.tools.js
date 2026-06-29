import { Career } from '../models/Career.model.js';
import { PREFERRED_DURATIONS, CAREER_DURATION_THRESHOLD } from '../constants/domain.js';

function filterByDuration(careers, durationType, index, accumulator) {
  if (index >= careers.length) return accumulator;

  const currentCareer = careers[index];
  const isShortCareer = currentCareer.durationYears < CAREER_DURATION_THRESHOLD;

  if (durationType === PREFERRED_DURATIONS.SHORT && isShortCareer) {
    accumulator.push(currentCareer);
  } else if (durationType === PREFERRED_DURATIONS.LONG && !isShortCareer) {
    accumulator.push(currentCareer);
  }

  return filterByDuration(careers, durationType, index + 1, accumulator);
}

export async function getCareerById(careerId) {
  return Career.findById(careerId);
}

export async function getCareersByDuration(durationType) {
  const allCareers = await Career.find();
  return filterByDuration(allCareers, durationType, 0, []);
}

export async function getCareerStatistics(careerId) {
  const { StatsService } = await import('../services/stats.service.js');
  return new StatsService().getCareerStatistics(careerId);
}
