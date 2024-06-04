import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from '../interfaces/questions.interface';
import { CreateQuestionDto } from 'src/dto/create-question.dto';

@Controller('api/questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Post(':id')
  async createForSet(
    @Body() createQuestionDto: CreateQuestionDto,
    id: string,
  ): Promise<Question> {
    return this.questionsService.createQuestion(createQuestionDto, id);
  }
  @Get()
  async findAll(): Promise<Question[]> {
    return this.questionsService.findAll();
  }
}
