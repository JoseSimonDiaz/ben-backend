import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  officialDuration: {
    type: String,
    required: true,
  },
  durationYears: {
    type: Number,
    required: true,
  },
  keywords: {
    type: [String],
  },
  requiredSkills: {
    logical: { type: Number, default: 0 },
    creative: { type: Number, default: 0 },
    social: { type: Number, default: 0 },
    investigative: { type: Number, default: 0 },
  },
});

careerSchema.index({ facultyId: 1 });
careerSchema.index({ durationYears: 1 });

export const Career = mongoose.model('Career', careerSchema);
