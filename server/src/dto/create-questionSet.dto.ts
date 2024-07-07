import {
  IsNotEmpty,
  IsString,
  IsEmpty,
  Length,
  IsArray,
  IsOptional,
  ArrayMaxSize,
  IsDateString,
} from 'class-validator';
import { Question } from 'src/interfaces/questions.interface';
export class CreateQuestionSetDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 32)
  readonly name: string;

  author: string;
  @IsEmpty()
  readonly questions: Question[];

  @Length(0, 500)
  readonly description: string;
}

class MetaData {
  @IsArray()
  @IsOptional()
  @ArrayMaxSize(5)
  readonly tags: string[];

  @IsOptional()
  @IsDateString()
  readonly date: Date;

  @IsString()
  @IsOptional()
  readonly subject: string;
}

export class EditQuestionSetDto {
  author: string;
  @Length(0, 500)
  @IsOptional()
  readonly description: string;

  readonly metaData: MetaData;
}
