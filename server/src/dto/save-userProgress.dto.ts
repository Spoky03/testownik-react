import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId, Types } from 'mongoose';
export class SaveQuestionSetProgressDto {
  @IsString()
  @IsNotEmpty()
  questionSetId: ObjectId;

  @IsArray()
  @IsNotEmpty()
  questions: Array<{ id: Types.ObjectId; repeats: number }>;

  sidebar: {
    correctAnswers: number;
    incorrectAnswers: number;
    totalQuestions: number;
    masteredQuestions: number;
    time: number;
  };
}
