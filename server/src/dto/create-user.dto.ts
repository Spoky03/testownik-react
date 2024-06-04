import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsBoolean,
  ValidateNested,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';
import { Questions } from 'src/interfaces/questions.interface';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsArray()
  questionSets: Questions;
}
