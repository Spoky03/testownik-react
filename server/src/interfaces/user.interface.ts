import { Document, ObjectId } from 'mongoose';
import { Questions } from './questions.interface';
import { SaveQuestionSetProgressDto } from 'src/dto/save-userProgress.dto';

export interface Progress extends Document {
  splice(progressIndex: unknown, arg1: number): unknown;
  findIndex(arg0: (p: any) => boolean): unknown;
  push(progress: SaveQuestionSetProgressDto): unknown;
  questionSetId: ObjectId;
  questions: { id: ObjectId; repeats: number }[];
  time: number;
}

export interface User extends Document {
  readonly id: number;
  username: string;
  password: string;
  questionSets: Questions;
  progress: Progress;
  bookmarks: string[];
}
