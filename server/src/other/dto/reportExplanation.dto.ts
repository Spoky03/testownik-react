import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ReportExplanation {
  @IsString()
  @IsNotEmpty()
  explanation: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 2024)
  reason: string;

  @IsString()
  @IsNotEmpty()
  questionId: string;
}
