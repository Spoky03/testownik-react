import { IsBoolean } from 'class-validator';
export class SettingsDto {
  @IsBoolean()
  agreements: boolean;

  @IsBoolean()
  newsletter: boolean;
}
