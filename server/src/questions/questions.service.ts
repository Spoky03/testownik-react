import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Question, Questions } from 'src/interfaces/questions.interface';
import {
  AppendQuestionDto,
  CreateQuestionDto,
} from '../dto/create-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject('QUESTION_MODEL')
    private questionModel: Model<Question>,
    @Inject('QUESTIONSET_MODEL')
    private questionsSetsModel: Model<Questions>,
  ) {}
  // async createQuestion(
  //   createQuestionDto: CreateQuestionDto,
  //   id: string,
  // ): Promise<Question> {
  //   const createdQuestion = new this.questionModel(createQuestionDto);
  //   const questions = await this.questionsModel.findById(id);
  //   questions.questions.push(createdQuestion);
  //   await questions.save();
  //   return createdQuestion.save();
  // }
  async findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }
  async appendQuestion(
    appendQuestionDto: AppendQuestionDto,
    user,
  ): Promise<Question> {
    const createdQuestion = new this.questionModel(appendQuestionDto.question);
    await createdQuestion.save();
    const questionSet = await this.questionsSetsModel.findById(
      appendQuestionDto.id,
    );
    questionSet.questions.push(createdQuestion);
    await questionSet.save();
    return createdQuestion;
  }
  async deleteOne(id: string): Promise<Question> {
    return this.questionModel.findByIdAndDelete(id).exec();
  }
}
