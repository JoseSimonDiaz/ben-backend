import mongoose from 'mongoose';

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

careerExperienceSchema.index({ careerId: 1, collaboratorEmail: 1 }, { unique: true });
careerExperienceSchema.index({ careerId: 1 });

export const CareerExperience = mongoose.model('CareerExperience', careerExperienceSchema);
