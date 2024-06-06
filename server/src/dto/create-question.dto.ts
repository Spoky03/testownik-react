import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsBoolean,
  ValidateNested,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsUnique } from 'src/helpers';

class AnswerDto {
  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsBoolean()
  correct: boolean;

  @IsNumber()
  id: number;
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  readonly question: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  @IsUnique('answer', {
    message: 'Answers must be unique',
  })
  readonly answers: AnswerDto[];
}

export class AppendQuestionDto {
  readonly question: CreateQuestionDto;
  readonly id: string;
}
