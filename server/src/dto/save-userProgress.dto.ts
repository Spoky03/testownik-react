import { IsArray, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';
export class SaveQuestionSetProgressDto {
  @IsString()
  @IsNotEmpty()
  questionSetId: ObjectId;

  @IsArray()
  questions: Array<{ id: ObjectId; repeats: number }>;

  sidebar: {
    correctAnswers: number;
    incorrectAnswers: number;
    totalQuestions: number;
    masteredQuestions: number;
    time: number;
  };
}
