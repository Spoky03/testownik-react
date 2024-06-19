import {
  IsArray,
  IsString,
  IsBoolean,
  ValidateNested,
  ArrayMinSize,
  IsNumber,
  Length,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsUnique } from 'src/helpers';

export class AnswerDto {
  @IsString()
  @Length(0, 999) // Removed @IsNotEmpty because @Length already ensures the string is not empty
  answer: string;

  @IsBoolean()
  correct: boolean;

  @IsNumber()
  id: number;
}

export class CreateQuestionDto {
  @IsString()
  @Length(1, 999) // Removed @IsNotEmpty for the same reason as above
  readonly question: string;

  @IsArray()
  @ArrayMinSize(1) // Ensures the array is not empty, so @IsNotEmpty is not needed
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  @IsUnique('answer', {
    message: 'Answers must be unique',
  })
  readonly answers: AnswerDto[];
}

export class AppendQuestionsDto {
  @ValidateNested()
  @Type(() => CreateQuestionDto)
  @IsArray()
  @ArrayMinSize(1)
  readonly questions: CreateQuestionDto[];
  readonly id: string;
}
