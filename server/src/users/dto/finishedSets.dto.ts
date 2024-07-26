import { IsDate, IsString } from 'class-validator';
export class GetFinishedSetsDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
export class FinishedSet {
  @IsString()
  setId: string;
}
