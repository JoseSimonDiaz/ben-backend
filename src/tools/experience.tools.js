import mongoose from 'mongoose';
import { CareerExperience } from '../models/CareerExperience.model.js';

export async function getExperiencesByCareer(careerId) {
  return CareerExperience.find({ careerId })
    .select('collaboratorName graduationYear actualCompletionTime perceivedDropoutRate hardestSubjects jobProspects reviewText createdAt')
    .sort({ createdAt: -1 });
}

export async function getExperienceSummary(careerId) {
  const targetId = new mongoose.Types.ObjectId(careerId);

  const stats = await CareerExperience.aggregate([
    { $match: { careerId: targetId } },
    {
      $group: {
        _id: null,
        totalExperiences: { $sum: 1 },
        averageDropoutRate: { $avg: '$perceivedDropoutRate' },
      },
    },
  ]);

  if (stats.length === 0) {
    return { totalExperiences: 0, averageDropoutRate: null };
  }

  const hardestSubjects = await CareerExperience.aggregate([
    { $match: { careerId: targetId } },
    { $unwind: '$hardestSubjects' },
    { $group: { _id: '$hardestSubjects.name', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 3 },
    { $project: { subjectName: '$_id', count: 1, _id: 0 } },
  ]);

  const jobProspects = await CareerExperience.aggregate([
    { $match: { careerId: targetId } },
    { $unwind: '$jobProspects' },
    { $group: { _id: '$jobProspects.title', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    { $project: { jobTitle: '$_id', count: 1, _id: 0 } },
  ]);

  return {
    totalExperiences: stats[0].totalExperiences,
    averageDropoutRate: Math.round(stats[0].averageDropoutRate * 10) / 10,
    topDifficultSubjects: hardestSubjects,
    commonJobProspects: jobProspects,
  };
}
