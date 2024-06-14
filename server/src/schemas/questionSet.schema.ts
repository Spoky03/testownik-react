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
  // questions: [
  //   {
  //     question: {
  //       type: String,
  //       required: true,
  //     },
  //     answers: {
  //       type: Array,
  //       required: true,
  //       items: {
  //         type: Object,
  //         properties: {
  //           id: Number,
  //           answer: String,
  //           correct: Boolean,
  //         },
  //       },
  //     },
  //   },
  // ],
});
