import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, //!!!!!
    required: true,
  },
  questionSets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuestionSets',
    },
  ],
});
