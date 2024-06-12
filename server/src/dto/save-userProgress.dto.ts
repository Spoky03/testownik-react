import { IsArray, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';
export class SaveQuestionSetProgressDto {
  @IsString()
  @IsNotEmpty()
  questionSetId: ObjectId;

  @IsArray()
  questions: Array<{ id: ObjectId; repeats: number }>;

  @IsNumber()
  time: number;
}
