import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { IsStrongPasswordRequirements } from 'src/helpers';

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

  @IsStrongPassword(
    IsStrongPasswordRequirements.requirements,
    IsStrongPasswordRequirements.message,
  )
  @IsOptional()
  @MinLength(8)
  readonly newPassword: string;
}
