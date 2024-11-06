import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
class ProgressQuestion {
  @Expose()
  @IsString()
  @Transform(({ value }) => value.toString(), {
    toClassOnly: false,
    toPlainOnly: true,
  })
  readonly id: string;

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
class ProgressEntity {
  @Expose()
  @Transform(({ value }) => value.toString(), {
    toClassOnly: false,
    toPlainOnly: true,
  })
  questionSetId: string;

  @Expose()
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

  constructor(partial: Partial<ProgressEntity>) {
    Object.assign(this, partial);
  }
}
class AnswerDto {
  @IsNumber()
  @Expose()
  readonly id: number;

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
  @IsString()
  @Transform(({ value }) => value.toString(), {
    toClassOnly: false,
    toPlainOnly: true,
  })
  readonly _id: string;
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

  @IsString()
  @Expose()
  readonly explanation: string;

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
  @IsString()
  @Transform(({ value }) => value.toString(), {
    toClassOnly: false,
    toPlainOnly: true,
  })
  readonly _id: string;

  constructor(partial: Partial<SetAuthorDto>) {
    Object.assign(this, partial);
  }
}
class MetaData {
  @Expose()
  @IsArray()
  readonly tags: string[];

  @Expose()
  @IsString()
  readonly date: Date;

  @Expose()
  @IsString()
  readonly subject: string;
}
export class QuestionSetEntity {
  @Expose()
  @Transform(({ value }) => value.toString(), {
    toClassOnly: false,
    toPlainOnly: true,
  })
  readonly _id: string;

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

  @Exclude()
  readonly likes: number;

  @Expose()
  readonly description: string;

  @Expose()
  readonly metaData: MetaData;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => GetQuestionDto)
  @Transform(
    ({ value }) => value.map((question) => new GetQuestionDto(question)),
    {
      toClassOnly: true,
    },
  )
  readonly questions: GetQuestionDto[];

  constructor(partial: Partial<QuestionSetEntity>) {
    Object.assign(this, partial);
  }
}
export class UserEntity {
  readonly username: string;
  readonly email: string;
  readonly _id: string;

  @Exclude()
  readonly password?: string;

  readonly bookmarks: string[];

  readonly settings: {
    agreements: boolean;
    newsletter: boolean;
  };

  readonly questionSets: QuestionSetEntity[];

  readonly progress: ProgressEntity[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
