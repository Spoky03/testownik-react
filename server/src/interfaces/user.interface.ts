import { Document } from 'mongoose';
import { Questions } from './questions.interface';

export interface User extends Document {
  readonly id: number;
  username: string;
  password: string;
  questionSets: Questions;
  progress: {
    [key: string]: {
      questions: {
        questionId: string;
        repets: number;
      }[];
      time: number;
    };
  };
}
