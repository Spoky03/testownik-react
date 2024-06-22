import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { QuestionsSetsService } from './questionsSets.service';
import {
  CreateQuestionSetDto,
  EditQuestionSetDto,
} from 'src/dto/create-questionSet.dto';
import { QuestionSet } from 'src/interfaces/questionSet.interface';
import { GetQuestionSetDto } from 'src/dto/get-questionSet.dto';

@Controller('api/sets')
export class QuestionsSetsController {
  constructor(private questionsSetsService: QuestionsSetsService) {}

  @Get()
  async findAll(@Request() req): Promise<GetQuestionSetDto[]> {
    const userId = req.user ? req.user.sub : null;
    return await this.questionsSetsService.findAll(userId);
  }
  @Post()
  async create(
    @Body() createQuestionSetDto: CreateQuestionSetDto,
    @Request() req,
  ): Promise<QuestionSet> {
    // add the user id to the question set
    return this.questionsSetsService.create(createQuestionSetDto, req.user);
  }
  @Put(':id')
  async edit(
    @Body() editQuestionSetDto: EditQuestionSetDto,
    @Param('id') id: string,
    @Request() req,
  ): Promise<QuestionSet> {
    return this.questionsSetsService.edit(editQuestionSetDto, id, req.user);
  }
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<QuestionSet> {
    return this.questionsSetsService.getOne(id);
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: string,
    @Request() req,
  ): Promise<QuestionSet> {
    return this.questionsSetsService.deleteOne(id, req.user);
  }
  @Put(':id/privacy')
  async changePrivacy(
    @Param('id') id: string,
    @Request() req,
  ): Promise<boolean> {
    return this.questionsSetsService.changePrivacy(id, req.user);
  }
  @Post(':id/like')
  async likeSet(
    @Param('id') id: string,
    @Request() req,
  ): Promise<{ likes: number; liked: boolean }> {
    return this.questionsSetsService.likeSet(id, req.user.sub);
  }
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
