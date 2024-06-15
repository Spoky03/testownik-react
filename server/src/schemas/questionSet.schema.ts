import * as mongoose from 'mongoose';

export const QuestionSetSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],
  description: {
    type: String,
    default: 'No description provided',
  },
  private: {
    type: Boolean,
    default: false,
  },
});
