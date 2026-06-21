import mongoose from 'mongoose';

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

careerExperienceSchema.index({ careerId: 1, collaboratorEmail: 1 }, { unique: true });
careerExperienceSchema.index({ careerId: 1 });

export const CareerExperience = mongoose.model('CareerExperience', careerExperienceSchema);
