import { IsArray, IsNotEmpty, IsString } from 'class-validator';
export class SaveQuestionSetProgressDto {
  @IsString()
  @IsNotEmpty()
  questionSetId: string;

  @IsArray()
  @IsNotEmpty()
  questions: Array<{ id: string; repeats: number }>;

  sidebar: {
    correctAnswers: number;
    incorrectAnswers: number;
    totalQuestions: number;
    masteredQuestions: number;
    time: number;
  };
}
