import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Questions } from 'src/interfaces/questions.interface';

@Injectable()
export class QuestionsSetsService {
  constructor(
    @Inject('QUESTIONSET_MODEL')
    private questionsSetsModel: Model<Questions>,
  ) {}

  async findAll(): Promise<Questions[]> {
    return this.questionsSetsModel.find().exec();
  }
  async create(): Promise<Questions> {
    const createdQuestions = new this.questionsSetsModel();
    return createdQuestions.save();
  }
}
