import { Document } from 'mongoose';
import { Questions } from './questions.interface';
import { SaveQuestionSetProgressDto } from 'src/dto/save-userProgress.dto';
export interface GlobalStats {
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  masteredQuestions: number;
  time: number;
  date: Date;
}
export interface Progress extends Document {
  splice(progressIndex: unknown, arg1: number): unknown;
  findIndex(arg0: (p: any) => boolean): unknown;
  push(progress: SaveQuestionSetProgressDto): unknown;
  questionSetId: string;
  questions: { id: string; repeats: number }[];
  sidebar: {
    correctAnswers: number;
    incorrectAnswers: number;
    totalQuestions: number;
    masteredQuestions: number;
    time: number;
  };
}
export interface UserReq {
  username: string;
  iat: number;
  roles: string[];
  exp: number;
  sub: string;
}

export interface User extends Document {
  readonly _id: string;
  username: string;
  email: string;
  password: string;
  roles: string[];
  questionSets: Questions[];
  progress: Progress[];
  bookmarks: string[];
  settings: {
    agreements: boolean;
    newsletter: boolean;
  };
  globalStats: [GlobalStats];
  weeklyTimeGoal: number;
  finishedSets: FinishedSet[];
}

interface FinishedSet {
  setId: string;
  date: Date;
}
