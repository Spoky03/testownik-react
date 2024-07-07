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
  metaData: {
    type: Object,
    default: {
      tags: [],
      date: Date.now(),
      subject: '',
    },
    tags: [
      {
        type: String,
      },
    ],
    date: {
      type: Date,
      default: Date.now(),
    },
    subject: {
      type: String,
      default: '',
    },
  },
  private: {
    type: Boolean,
    default: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});
