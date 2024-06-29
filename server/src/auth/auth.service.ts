import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/dto/signup-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByName(username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const match = await bcrypt.compare(pass, user.password);
    if (!match) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    const payload = {
      sub: user._id,
      username: user.username,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(signUpDto: SignUpDto): Promise<{ access_token: string }> {
    const user = await this.usersService.create(signUpDto);
    const payload = {
      sub: user._id,
      username: user.username,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
