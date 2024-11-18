import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from '../interfaces/questions.interface';
import {
  AppendQuestionsDto,
  CreateQuestionDto,
} from 'src/dto/create-question.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DifficultyVoteDto } from './dto/difficulty-vote.dto';
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
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req): Promise<Question> {
    return this.questionsService.deleteOne(id, req.user.sub);
  }
  @Put(':id')
  async put(
    @Param('id') id: string,
    @Body() body: CreateQuestionDto,
    @Request() req,
  ): Promise<Question> {
    return this.questionsService.updateOne(id, body, req.user.sub);
  }
  @Put(':id/image')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1024 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
  }
  @Post(':id/voteDifficulty')
  async voteDifficulty(
    @Param('id') id: string,
    @Body() DifficultyVoteDto: DifficultyVoteDto,
    @Request() req,
  ) {
    return this.questionsService.voteDifficulty(
      id,
      DifficultyVoteDto,
      req.user.sub,
    );
  }
}
