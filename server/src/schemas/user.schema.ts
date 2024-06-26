import * as mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema(
  {
    questionSetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Set',
    },
    questions: {
      type: [
        new mongoose.Schema(
          {
            id: {
              type: mongoose.Schema.Types.ObjectId,
              required: true,
              ref: 'Question',
            },
            repeats: {
              type: Number,
              required: true,
            },
          },
          { _id: false },
        ),
      ],
      required: true,
    },
    sidebar: {
      correctAnswers: {
        type: Number,
        required: true,
      },
      incorrectAnswers: {
        type: Number,
        required: true,
      },
      totalQuestions: {
        type: Number,
        required: true,
      },
      masteredQuestions: {
        type: Number,
        required: true,
      },
      time: {
        type: Number,
        required: true,
      },
    },
  },
  { _id: false },
);

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  questionSets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuestionSets',
    },
  ],
  progress: [ProgressSchema],
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuestionSets',
    },
  ],
  settings: {
    agreements: {
      type: Boolean,
      default: false,
    },
    newsletter: {
      type: Boolean,
      default: false,
    },
  },
});
