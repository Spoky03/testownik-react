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
import { Exclude, Type } from 'class-transformer';
import { GetQuestionSetDto } from './get-questionSet.dto';
import { ObjectId } from 'mongoose';
class Progress {
  @IsString()
  @IsNotEmpty()
  readonly questionSetId: string;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  readonly sidebar: any;

  readonly questions: any;
}
export class GetUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ValidateNested()
  @Type(() => Progress)
  readonly progress: Progress[];
  @IsNotEmpty()
  @ValidateNested()
  readonly bookmarks: string[];

  //   @IsNotEmpty()
  //   @ValidateNested()
  //   @IsArray()
  //   readonly progress: Progress[];

  readonly questionSets: any;

  @Exclude()
  password: string;
  @Exclude()
  readonly _id: ObjectId;

  constructor(partial: Partial<GetUserDto>) {
    Object.assign(this, partial);
  }
}
