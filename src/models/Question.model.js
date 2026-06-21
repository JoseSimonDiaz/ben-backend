import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  score: {
    logical: { type: Number, default: 0 },
    creative: { type: Number, default: 0 },
    social: { type: Number, default: 0 },
    investigative: { type: Number, default: 0 },
  },
}, { _id: false });

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['logical', 'creative', 'social', 'investigative'],
  },
  options: {
    type: [optionSchema],
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
});

questionSchema.index({ category: 1 });
questionSchema.index({ order: 1 });

export const Question = mongoose.model('Question', questionSchema);
