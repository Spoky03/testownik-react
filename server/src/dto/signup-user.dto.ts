import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from 'class-validator';
export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 18)
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  @Length(8, 32)
  password: string;
}
