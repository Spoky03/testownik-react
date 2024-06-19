import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsBoolean,
  ValidateNested,
  ArrayMinSize,
  IsNumber,
  Length,
} from 'class-validator';
import { Questions } from 'src/interfaces/questions.interface';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 16)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 30)
  readonly password: string;

  @IsArray()
  questionSets: Questions;
}
