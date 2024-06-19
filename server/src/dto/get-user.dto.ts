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
import { Exclude, Transform, Type } from 'class-transformer';
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
  readonly username: string;

  @IsArray()
  readonly progress: Progress[];

  @IsNotEmpty()
  readonly bookmarks: string[];

  //   @IsNotEmpty()
  //   @ValidateNested()
  //   @IsArray()
  //   readonly progress: Progress[];

  readonly questionSets: any;

  readonly _id: Types.ObjectId;
  readonly password: string;
  //   @Exclude()
  //   password: string;

  //   @Exclude()
  //   readonly _id: Types.ObjectId;

  //   constructor(partial: Partial<GetUserDto>) {
  //     Object.assign(this, partial);
  //   }
}
