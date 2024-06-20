import { Document, Types } from 'mongoose';
export interface Answer {
  id: number;
  answer: string;
  correct: boolean;
}
export interface Question extends Document {
  readonly _id: Types.ObjectId;
  readonly question: string;
  readonly answers: Answer[];
}
export interface Questions extends Document {
  readonly author: {
    username: string;
    _id: Types.ObjectId;
  };
  readonly questions: Question[];
  readonly name: string;
  readonly description: string;
  readonly likes: number;
  readonly private: boolean;
  readonly _id: Types.ObjectId;
}
