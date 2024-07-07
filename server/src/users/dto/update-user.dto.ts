import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class UpdateUserEntity {
  @IsString()
  @IsOptional()
  readonly username: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly currentPassword: string;

  @IsStrongPassword()
  @IsOptional()
  @MinLength(8)
  readonly newPassword: string;
}
