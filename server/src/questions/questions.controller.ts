import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question, Questions } from '../interfaces/questions.interface';
import {
  AppendQuestionDto,
  CreateQuestionDto,
} from 'src/dto/create-question.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  // @Post(':id')
  // async createForSet(
  //   @Body() createQuestionDto: CreateQuestionDto,
  //   id: string,
  // ): Promise<Question> {
  //   return this.questionsService.createQuestion(createQuestionDto, id);
  // }
  @Get()
  async findAll(): Promise<Question[]> {
    return this.questionsService.findAll();
  }
  @UseGuards(AuthGuard)
  @Post()
  async appendQuestion(
    @Body() appendQuestionDto: AppendQuestionDto,
    @Request() req,
  ): Promise<Question> {
    return this.questionsService.appendQuestion(appendQuestionDto, req.user);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Question> {
    return this.questionsService.deleteOne(id);
  }
}
