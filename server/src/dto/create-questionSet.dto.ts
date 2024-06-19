import { IsNotEmpty, IsString, IsEmpty, Length } from 'class-validator';
import { Question } from 'src/interfaces/questions.interface';
export class CreateQuestionSetDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  readonly name: string;

  author: string;
  @IsEmpty()
  readonly questions: Question[];

  @Length(0, 200)
  readonly description: string;
}

export class EditQuestionSetDto {
  author: string;
  @Length(0, 200)
  readonly description: string;
}
