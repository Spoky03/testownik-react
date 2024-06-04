import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  // @UseGuards(AuthGuard)
  // @Get('user')
  // async getUser(@Request() req) {
  //   return req.user;
  // }
}
