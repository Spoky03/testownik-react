import { IsNumber, Max } from 'class-validator';
export class WeeklyTimeGoalDto {
  @IsNumber()
  @Max(60 * 24 * 7)
  weeklyTimeGoal: number;
}
