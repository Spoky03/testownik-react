import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Question, Questions } from 'src/interfaces/questions.interface';
import { CreateQuestionDto } from '../dto/create-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject('QUESTION_MODEL')
    private questionModel: Model<Question>,
    @Inject('QUESTIONSET_MODEL')
    private questionsModel: Model<Questions>,
  ) {}
  async createQuestion(
    createQuestionDto: CreateQuestionDto,
    id: string,
  ): Promise<Question> {
    const createdQuestion = new this.questionModel(createQuestionDto);
    const questions = await this.questionsModel.findById(id);
    questions.questions.push(createdQuestion);
    await questions.save();
    return createdQuestion.save();
  }
  async findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }
}
