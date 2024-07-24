import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Put,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { QuestionSet } from 'src/interfaces/questionSet.interface';
import { UserEntity } from 'src/dto/get-user.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Progress } from 'src/interfaces/user.interface';
import { SignUpDto } from 'src/dto/signup-user.dto';
import { SettingsDto } from './dto/save-settings.dto';
import { UpdateUserEntity } from './dto/update-user.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(RolesGuard)
  @Roles(['admin'])
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  async findMe(@Request() req): Promise<UserEntity> {
    return this.usersService.findById(req.user.sub);
  }
  @Put('me')
  async updateMe(
    @Body()
    userData: UpdateUserEntity,
    @Request() req,
  ) {
    return this.usersService.updateMe(userData, req.user.sub);
  }
  @Delete('me')
  async deleteMe(@Request() req) {
    return this.usersService.deleteMe(req.user.sub);
  }
  @Post()
  async create(@Body() createUserDto: SignUpDto) {
    return this.usersService.create(createUserDto);
  }
  @Put('settings')
  async saveSettings(@Body() settings: SettingsDto, @Request() req) {
    return this.usersService.saveSettings(settings, req.user.sub);
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
}
