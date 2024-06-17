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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SaveQuestionSetProgressDto } from 'src/dto/save-userProgress.dto';
import { QuestionSet } from 'src/interfaces/questionSet.interface';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get('me')
  async findMe(@Request() req) {
    return this.usersService.findById(req.user.sub);
  }
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @UseGuards(AuthGuard)
  @Put('progress')
  async save(
    @Body() saveQuestionSetProgressDto: SaveQuestionSetProgressDto,
    @Request() req,
  ) {
    return this.usersService.saveProgress(
      saveQuestionSetProgressDto,
      req.user.sub,
    );
  }
  @UseGuards(AuthGuard)
  @Get('progress')
  async getProgress(@Request() req) {
    return this.usersService.getProgress(req.user.sub);
  }
  @UseGuards(AuthGuard)
  @Delete('progress/:id')
  async resetProgress(@Param('id') id: string, @Request() req) {
    return this.usersService.resetProgress(id, req.user.sub);
  }
  @UseGuards(AuthGuard)
  @Post('bookmarks')
  async addBookmark(@Body('id') id, @Request() req) {
    return this.usersService.addBookmark(id, req.user.sub);
  }
  @UseGuards(AuthGuard)
  @Delete('bookmarks/:id')
  async deleteBookmark(@Param('id') id: string, @Request() req) {
    return this.usersService.deleteBookmark(id, req.user.sub);
  }
  @UseGuards(AuthGuard)
  @Get('foreign')
  async getForeignQuestionSets(@Request() req): Promise<QuestionSet[]> {
    return this.usersService.getBookmarkedForeignQuestionSets(req.user.sub);
  }
  // @UseGuards(AuthGuard)
  // @Get('user')
  // async getUser(@Request() req) {
  //   return req.user;
  // }
}
