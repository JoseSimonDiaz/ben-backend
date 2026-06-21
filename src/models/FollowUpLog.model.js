import mongoose from 'mongoose';

const followUpLogSchema = new mongoose.Schema({
  quizSessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizSession',
  },
  emailSent: {
    type: Boolean,
    default: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

export const FollowUpLog = mongoose.model('FollowUpLog', followUpLogSchema);
