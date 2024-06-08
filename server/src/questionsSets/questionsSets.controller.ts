import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionsSetsService } from './questionsSets.service';
import { Questions } from '../interfaces/questions.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateQuestionSetDto } from 'src/dto/create-questionSet.dto';
import {
  AppendQuestionDto,
  CreateQuestionDto,
} from 'src/dto/create-question.dto';

@Controller('api/sets')
export class QuestionsSetsController {
  constructor(private questionsSetsService: QuestionsSetsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<Questions[]> {
    return this.questionsSetsService.findAll();
  }
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createQuestionSetDto: CreateQuestionSetDto,
    @Request() req,
  ): Promise<Questions> {
    // add the user id to the question set
    return this.questionsSetsService.create(createQuestionSetDto, req.user);
  }
  @UseGuards(AuthGuard)
  @Post('appendQuestion')
  async appendQuestion(
    @Body() appendQuestionDto: AppendQuestionDto,
    @Request() req,
  ): Promise<Questions> {
    return this.questionsSetsService.appendQuestion(
      appendQuestionDto,
      req.user,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string, @Request() req): Promise<Questions> {
    return this.questionsSetsService.getOne(id, req.user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id') id: string, @Request() req): Promise<Questions> {
    return this.questionsSetsService.deleteOne(id, req.user);
  }

}
