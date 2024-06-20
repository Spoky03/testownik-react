import { Document, ObjectId, Types } from 'mongoose';
import { Questions } from './questions.interface';
import { SaveQuestionSetProgressDto } from 'src/dto/save-userProgress.dto';

export interface Progress extends Document {
  splice(progressIndex: unknown, arg1: number): unknown;
  findIndex(arg0: (p: any) => boolean): unknown;
  push(progress: SaveQuestionSetProgressDto): unknown;
  questionSetId: Types.ObjectId;
  questions: { id: Types.ObjectId; repeats: number }[];
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
  exp: number;
  sub: string;
}
export interface User extends Document {
  readonly id: Types.ObjectId;
  username: string;
  password: string;
  questionSets: Questions[];
  progress: Progress[];
  bookmarks: string[];
}
