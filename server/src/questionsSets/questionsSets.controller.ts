import { Controller, Get, Post } from '@nestjs/common';
import { QuestionsSetsService } from './questionsSets.service';
import { Questions } from '../interfaces/questions.interface';

@Controller('api/sets')
export class QuestionsSetsController {
  constructor(private questionsSetsService: QuestionsSetsService) {}

  @Get()
  async findAll(): Promise<Questions[]> {
    return this.questionsSetsService.findAll();
  }
  @Post()
  async create(): Promise<Questions> {
    return this.questionsSetsService.create();
  }
}
