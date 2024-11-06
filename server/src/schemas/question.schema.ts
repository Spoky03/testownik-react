import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: Array,
    required: true,
    items: {
      type: Object,
      properties: {
        id: Number,
        answer: String,
        correct: Boolean,
      },
    },
  },
  explanation: {
    type: String,
    default: '',
  },
  report: {
    type: Number,
    default: 0,
  },
  difficulty: {
    type: Array,
    items: {
      type: Object,
      properties: {
        user: String,
        value: Number,
      },
    },
    default: [],
  },
});
