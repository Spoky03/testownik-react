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
import { QuestionSet } from 'src/interfaces/questionSet.interface';
import { User } from 'src/interfaces/user.interface';

@Controller('api/sets')
export class QuestionsSetsController {
  constructor(private questionsSetsService: QuestionsSetsService) {}

  @Get()
  async findAll(): Promise<QuestionSet[]> {
    return this.questionsSetsService.findAll();
  }
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createQuestionSetDto: CreateQuestionSetDto,
    @Request() req,
  ): Promise<QuestionSet> {
    // add the user id to the question set
    return this.questionsSetsService.create(createQuestionSetDto, req.user);
  }
  @UseGuards(AuthGuard)
  @Post('appendQuestion')
  async appendQuestion(
    @Body() appendQuestionDto: AppendQuestionDto,
    @Request() req,
  ): Promise<QuestionSet> {
    return this.questionsSetsService.appendQuestion(
      appendQuestionDto,
      req.user,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string, @Request() req): Promise<QuestionSet> {
    return this.questionsSetsService.getOne(id, req.user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteOne(
    @Param('id') id: string,
    @Request() req,
  ): Promise<QuestionSet> {
    return this.questionsSetsService.deleteOne(id, req.user);
  }
  // @UseGuards(AuthGuard)
  // @Post('foreign')
  // async pushForeignQuestionSet(
  //   @Body('questionSetId')
  //   questionSetId: string,
  //   @Request() req,
  // ): Promise<User['foreignQuestionSets']> {
  //   console.log(questionSetId);
  //   return this.questionsSetsService.pushForeignToUser(req.user, questionSetId);
  // }
}
