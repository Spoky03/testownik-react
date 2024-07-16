import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { IsStrongPasswordRequirements } from 'src/helpers';
export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 18)
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword(
    IsStrongPasswordRequirements.requirements,
    IsStrongPasswordRequirements.message,
  )
  @Length(8, 32)
  password: string;
}
