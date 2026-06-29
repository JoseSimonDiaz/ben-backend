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

const hardestSubjectSchema = new mongoose.Schema({
  name: { type: String },
  reason: { type: String },
  preparationTip: { type: String },
}, { _id: false });

const jobProspectSchema = new mongoose.Schema({
  title: { type: String },
  salaryRange: { type: String },
}, { _id: false });

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
  perceivedDropoutRate: {
    type: Number,
    min: 0,
    max: 100,
  },
  hardestSubjects: {
    type: [hardestSubjectSchema],
  },
  jobProspects: {
    type: [jobProspectSchema],
  },
  reviewText: {
    type: String,
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
