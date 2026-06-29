import mongoose from 'mongoose';
import {
  HIGH_SCHOOL_SUBJECTS,
  FREE_TIME_ACTIVITIES,
  ENJOYED_ACTIVITIES,
  PREFERRED_WORK_AREAS,
  IMPORTANT_SKILLS,
  PERSONALITY_TRAITS,
  DAILY_ACTIVITIES,
} from '../constants/domain.js';

const careerExperienceSchema = new mongoose.Schema({
  careerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
    required: true,
  },
  collaboratorName: {
    type: String,
    required: true,
  },
  collaboratorEmail: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  graduationYear: {
    type: Number,
  },
  actualCompletionTime: {
    type: String,
  },
  university: {
    type: String,
    default: '',
  },
  graduated: {
    type: String,
    enum: ['yes', 'no', 'in_progress'],
    default: 'yes',
  },
  difficultyRating: {
    type: Number,
    min: 1,
    max: 10,
    default: null,
  },
  jobMarketRating: {
    type: Number,
    min: 1,
    max: 5,
    default: null,
  },
  foundRelatedJob: {
    type: String,
    enum: ['yes', 'no', 'partial'],
    default: null,
  },
  bestAspects: {
    type: [String],
    default: [],
  },
  worstAspects: {
    type: [String],
    default: [],
  },
  importantSkills: {
    type: [String],
    default: [],
  },
  hardestSubjects: {
    type: [String],
    default: [],
  },
  recommendationRating: {
    type: Number,
    min: 1,
    max: 5,
    default: null,
  },
  reviewText: {
    type: String,
    default: '',
  },
  favoriteHighSchoolSubjects: {
    type: [String],
    enum: Object.values(HIGH_SCHOOL_SUBJECTS),
    default: [],
  },
  freeTimeActivities: {
    type: [String],
    enum: Object.values(FREE_TIME_ACTIVITIES),
    default: [],
  },
  enjoyedActivities: {
    type: [String],
    enum: Object.values(ENJOYED_ACTIVITIES),
    default: [],
  },
  preferredWorkAreas: {
    type: [String],
    enum: Object.values(PREFERRED_WORK_AREAS),
    default: [],
  },
  importantSkills: {
    type: [String],
    enum: Object.values(IMPORTANT_SKILLS),
    default: [],
  },
  personalityTraits: {
    type: [String],
    enum: Object.values(PERSONALITY_TRAITS),
    default: [],
  },
  dailyActivities: {
    type: [String],
    enum: Object.values(DAILY_ACTIVITIES),
    default: [],
  },
  recommendationRating: {
    type: Number,
    min: 1,
    max: 5,
    default: null,
  },
  mostDifficultSubjects: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

careerExperienceSchema.index({ careerId: 1, collaboratorEmail: 1 }, { unique: true });
careerExperienceSchema.index({ careerId: 1 });

export const CareerExperience = mongoose.model('CareerExperience', careerExperienceSchema);
