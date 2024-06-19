import {
  IsNotEmpty,
  IsString,
  IsEmpty,
  Length,
  ValidateNested,
  IsNumber,
  IsBoolean,
  IsObject,
  IsArray,
} from 'class-validator';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { GetQuestionSetDto } from './get-questionSet.dto';
import { ObjectId, Types } from 'mongoose';
import { AnswerDto } from './create-question.dto';

class Progress {
  @IsString()
  @IsNotEmpty()
  readonly questionSetId: ObjectId;

  @IsObject()
  @IsNotEmpty()
  readonly sidebar: {
    correctAnswers: number;
    incorrectAnswers: number;
    totalQuestions: number;
    masteredQuestions: number;
    time: number;
  };

  readonly questions: {
    id: ObjectId;
    repeats: number;
  }[];
}
export class GetUserDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  readonly username: string;

  @IsArray()
  @Expose()
  readonly progress: Progress[];

  @IsNotEmpty()
  @Expose()
  readonly bookmarks: string[];

  //   @IsNotEmpty()
  //   @ValidateNested()
  //   @IsArray()
  //   readonly progress: Progress[];
  @Expose()
  readonly questionSets: any;

  @Exclude()
  password: string;

  @Exclude()
  readonly _id: Types.ObjectId;

  constructor(partial: Partial<GetUserDto>) {
    Object.assign(this, partial);
  }
}
