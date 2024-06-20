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
  IsNotEmptyObject,
} from 'class-validator';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';
class ProgressQuestion {
  @IsNotEmpty()
  @Expose()
  @Transform(({ value }) => value.toString('hex'), {
    toClassOnly: true,
  })
  readonly id: Types.ObjectId;

  @Expose()
  readonly repeats: number;

  constructor(partial: Partial<ProgressQuestion>) {
    Object.assign(this, partial);
  }
}
class ProgressSidebar {
  @Expose()
  readonly correctAnswers: number;

  @Expose()
  readonly incorrectAnswers: number;

  @Expose()
  readonly totalQuestions: number;

  @Expose()
  readonly masteredQuestions: number;

  @Expose()
  readonly time: number;

  constructor(partial: Partial<ProgressSidebar>) {
    Object.assign(this, partial);
  }
}
class Progress {
  @Expose()
  @IsObject()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString('hex'), {
    toClassOnly: true,
  })
  readonly questionSetId: Types.ObjectId;

  @Expose()
  @Type(() => ProgressSidebar)
  @Transform(({ value }) => new ProgressSidebar(value), {
    toClassOnly: true,
  })
  readonly sidebar: ProgressSidebar;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => ProgressQuestion)
  @Transform(
    ({ value }) => value.map((question) => new ProgressQuestion(question)),
    {
      toClassOnly: true,
    },
  )
  readonly questions: ProgressQuestion[];

  constructor(partial: Partial<Progress>) {
    Object.assign(this, partial);
  }
}
class AnswerDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly answer: string;

  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  readonly correct: boolean;

  constructor(partial: Partial<AnswerDto>) {
    Object.assign(this, partial);
  }
}
class GetQuestionDto {
  @Expose()
  @IsObject()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString('hex'), {
    toClassOnly: true,
  })
  readonly _id: Types.ObjectId;
  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly question: string;

  @IsNotEmpty()
  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  @Transform(({ value }) => value.map((answer) => new AnswerDto(answer)), {
    toClassOnly: true,
  })
  readonly answers: AnswerDto[];

  constructor(partial: Partial<GetQuestionDto>) {
    Object.assign(this, partial);
  }
}
class SetAuthorDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @Expose()
  @Transform(({ value }) => value.toString('hex'), {
    toClassOnly: true,
  })
  readonly _id: Types.ObjectId;

  constructor(partial: Partial<SetAuthorDto>) {
    Object.assign(this, partial);
  }
}
class GetQuestionSetDto {
  @Expose()
  @IsObject()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString('hex'), {
    toClassOnly: true,
  })
  readonly _id: Types.ObjectId;

  @Expose()
  @ValidateNested()
  @Type(() => SetAuthorDto)
  @Transform(({ value }) => new SetAuthorDto(value), {
    toClassOnly: true,
  })
  readonly author: SetAuthorDto;

  @Expose()
  readonly name: string;

  @Expose()
  readonly private: boolean;

  @Expose()
  readonly likes: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly description: string;

  @Expose()
  // @IsNotEmpty()
  // @IsArray()
  // @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => GetQuestionDto)
  @Transform(
    ({ value }) => value.map((question) => new GetQuestionDto(question)),
    {
      toClassOnly: true,
    },
  )
  readonly questions: GetQuestionDto[];

  constructor(partial: Partial<GetQuestionSetDto>) {
    Object.assign(this, partial);
  }
}
export class GetUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @Expose()
  @IsNotEmpty()
  @Transform(({ value }) => value.map((bookmark) => bookmark.toString('hex')), {
    toClassOnly: true,
  })
  readonly bookmarks: string[];

  @Expose()
  @ValidateNested()
  @IsArray()
  @Type(() => Progress)
  @Transform(({ value }) => value.map((progress) => new Progress(progress)), {
    toClassOnly: true,
  })
  readonly progress: Progress[];

  @Expose()
  @ValidateNested()
  @IsArray()
  @Type(() => GetQuestionSetDto)
  @Transform(
    ({ value }) =>
      value.map((questionSet) => new GetQuestionSetDto(questionSet)),
    {
      toClassOnly: true,
    },
  )
  readonly questionSets: GetQuestionSetDto[];

  @Expose()
  readonly _id: Types.ObjectId;
  @Exclude()
  readonly password: string;
  //   @Exclude()
  //   password: string;

  //   @Exclude()
  //   readonly _id: Types.ObjectId;

  constructor(partial: Partial<GetUserDto>) {
    Object.assign(this, partial);
  }
}
