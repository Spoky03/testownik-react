import * as mongoose from 'mongoose';

export const QuestionSetSchema = new mongoose.Schema({
  author: String,
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],
});
