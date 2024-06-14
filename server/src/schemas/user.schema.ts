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
    time: {
      type: Number,
      required: true,
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
});
