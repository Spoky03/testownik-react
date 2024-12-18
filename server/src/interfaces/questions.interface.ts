import { Document } from 'mongoose';
export interface Answer {
  id: number;
  answer: string;
  correct: boolean;
}
export interface Question extends Document {
  readonly _id: string;
  readonly question: string;
  readonly answers: Answer[];
  explanation: string;
  report: number;
  difficulty: {
    user: string;
    value: number;
  }[];
}
export interface Questions extends Document {
  readonly author: {
    username: string;
    _id: string;
  };
  readonly questions: Question[];
  readonly name: string;
  readonly description: string;
  readonly likes: string[];
  readonly private: boolean;
  readonly _id: string;
  readonly metaData: {
    tags: string[];
    date: Date;
    subject: string;
  };
}
