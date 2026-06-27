import mongoose from 'mongoose';
import { QUESTION_TARGETS, QUESTION_CATEGORIES, QUESTION_TYPES } from '../constants/domain.js';

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  score: {
    [QUESTION_CATEGORIES.LOGICAL]: { type: Number, default: 0 },
    [QUESTION_CATEGORIES.CREATIVE]: { type: Number, default: 0 },
    [QUESTION_CATEGORIES.SOCIAL]: { type: Number, default: 0 },
    [QUESTION_CATEGORIES.INVESTIGATIVE]: { type: Number, default: 0 },
  },
}, { _id: false });

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: Object.values(QUESTION_CATEGORIES),
    required: function () { return this.questionType === QUESTION_TYPES.MULTIPLE_CHOICE && this.target === QUESTION_TARGETS.STUDENT; },
  },
  options: {
    type: [optionSchema],
    required: function () { return this.questionType === QUESTION_TYPES.MULTIPLE_CHOICE; },
  },
  order: {
    type: Number,
    default: 0,
  },
  target: {
    type: String,
    enum: Object.values(QUESTION_TARGETS),
    default: QUESTION_TARGETS.STUDENT,
  },
  questionType: {
    type: String,
    enum: Object.values(QUESTION_TYPES),
    default: QUESTION_TYPES.MULTIPLE_CHOICE,
  },
});

questionSchema.index({ order: 1 });
questionSchema.index({ target: 1, category: 1 });

export const Question = mongoose.model('Question', questionSchema);
