import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from '../interfaces/questions.interface';
import {
  AppendQuestionsDto,
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
  async appendQuestions(
    @Body() appendQuestionsDto: AppendQuestionsDto,
    @Request() req,
  ): Promise<Question[]> {
    return this.questionsService.appendQuestions(
      appendQuestionsDto,
      req.user.sub,
    );
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req): Promise<Question> {
    return this.questionsService.deleteOne(id, req.user.sub);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  async put(
    @Param('id') id: string,
    @Body() body: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionsService.updateOne(id, body);
  }
}
