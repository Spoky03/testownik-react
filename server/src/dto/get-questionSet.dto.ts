import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Question } from 'src/interfaces/questions.interface';
class Author {
  @IsString()
  @IsNotEmpty()
  readonly username: string;
  @IsString()
  @IsNotEmpty()
  readonly _id: string;
}
export class GetQuestionSetDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly questions: Question[];

  readonly description: string;

  @ValidateNested()
  @Type(() => Author)
  readonly author: Author;

  @IsNumber()
  readonly likes: number;

  @IsBoolean()
  readonly liked: boolean;

  @IsBoolean()
  readonly private: boolean;
}
