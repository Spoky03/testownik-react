import { IsNotEmpty, IsString, Length } from 'class-validator';
export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 18)
  username: string;

  @IsString()
  email: string;

  @IsString()
  @Length(8, 32)
  password: string;
}
