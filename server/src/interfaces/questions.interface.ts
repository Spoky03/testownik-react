import { Document } from 'mongoose';
export interface Answer {
  id: number;
  answer: string;
  correct: boolean;
}
export interface Question extends Document {
  readonly _id: number;
  readonly question: string;
  readonly answers: Answer[];
}
export interface Questions extends Document {
  readonly author: string;
  readonly questions: Question[];
}
