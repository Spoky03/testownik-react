import { IsNotEmpty, IsString, IsEmpty } from 'class-validator';
import { Question } from 'src/interfaces/questions.interface';
export class CreateQuestionSetDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  author: string;
  @IsEmpty()
  readonly questions: Question[];
}
