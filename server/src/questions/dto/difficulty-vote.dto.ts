import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class DifficultyVoteDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  value: number;
}
