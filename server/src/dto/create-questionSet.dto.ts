import {
  IsNotEmpty,
  IsString,
  IsEmpty,
  Length,
  IsArray,
  IsOptional,
  ArrayMaxSize,
} from 'class-validator';
import { IsUnique } from 'src/helpers';
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
class Tag {
  @IsString()
  @Length(1, 16)
  readonly name: string;
}
export class EditQuestionSetDto {
  author: string;
  @Length(0, 500)
  @IsOptional()
  readonly description: string;

  @IsArray()
  @IsOptional()
  @ArrayMaxSize(5)
  // @IsUnique('name', {
  //   message: 'Tags must be unique',
  // })
  readonly tags: Tag[];
}
