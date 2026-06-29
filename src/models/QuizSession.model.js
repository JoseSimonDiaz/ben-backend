import mongoose from 'mongoose';
import { PREFERRED_DURATIONS } from '../constants/domain.js';

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  selectedOptionIndex: {
    type: Number,
    required: true,
  },
}, { _id: false });

const quizSessionSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: null,
  },
  answers: {
    type: [answerSchema],
    required: true,
  },
  preferredDuration: {
    type: String,
    enum: Object.values(PREFERRED_DURATIONS),
    required: true,
  },
  recommendedCareerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
  },
  matchPercentage: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const QuizSession = mongoose.model('QuizSession', quizSessionSchema);
