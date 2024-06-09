import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsBoolean,
  ValidateNested,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';
export class SaveQuestionSetProgressDto {
  @IsString()
  @IsNotEmpty()
  readonly questionSetId: string;

  @IsArray()
  questions: Array<{ questionId: string; repets: number }>;

  @IsNumber()
  time: number;
}
