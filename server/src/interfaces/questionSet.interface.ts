import { Document } from 'mongoose';
import { Answer } from './questions.interface';
export interface QuestionSet extends Document {
  name: string;
  author: string;
  questions: {
    _id: string;
    question: string;
    answers: Answer[];
  }[];
  private: boolean;
  likes: string[];
  tags: string[];
}
