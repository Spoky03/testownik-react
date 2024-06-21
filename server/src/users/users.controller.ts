import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Put,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SaveQuestionSetProgressDto } from 'src/dto/save-userProgress.dto';
import { QuestionSet } from 'src/interfaces/questionSet.interface';
import { UserEntity } from 'src/dto/get-user.dto';
import { Progress } from 'src/interfaces/user.interface';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  async findMe(@Request() req): Promise<UserEntity> {
    return this.usersService.findById(req.user.sub);
  }
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Put('progress')
  async save(@Body() Progress: Progress, @Request() req) {
    return this.usersService.saveProgress(Progress, req.user.sub);
  }
  @Get('progress')
  async getProgress(@Request() req) {
    return this.usersService.getProgress(req.user.sub);
  }
  @Delete('progress/:id')
  async resetProgress(@Param('id') id: string, @Request() req) {
    return this.usersService.resetProgress(id, req.user.sub);
  }
  @Post('bookmarks')
  async addBookmark(@Body('id') id, @Request() req) {
    return this.usersService.addBookmark(id, req.user.sub);
  }
  @Delete('bookmarks/:id')
  async deleteBookmark(@Param('id') id: string, @Request() req) {
    return this.usersService.deleteBookmark(id, req.user.sub);
  }
  @Get('foreign')
  async getForeignQuestionSets(@Request() req): Promise<QuestionSet[]> {
    return this.usersService.getBookmarkedForeignQuestionSets(req.user.sub);
  }
  // @Get('user')
  // async getUser(@Request() req) {
  //   return req.user;
  // }
}
