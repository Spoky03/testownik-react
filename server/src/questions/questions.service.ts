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
    @Inject('USER_MODEL')
    private usersModel: Model<Questions>,
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
    userId: string,
  ): Promise<Question> {
    const user = await this.usersModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const questionSet = await this.questionsSetsModel.findById(
      appendQuestionDto.id,
    );
    if (!questionSet) {
      throw new Error('Question set not found');
    }
    if (questionSet.author.toString() !== user._id.toString()) {
      throw new Error('You are not the author of this question set');
    }
    const createdQuestion = new this.questionModel(appendQuestionDto.question);
    await createdQuestion.save();
    questionSet.questions.push(createdQuestion);
    await questionSet.save();
    return createdQuestion;
  }
  async deleteOne(id: string, userId:string): Promise<Question> {
    //TODO check if user is author
    await this.questionsSetsModel
      .updateMany({ questions: id }, { $pull: { questions: id } })
      .exec();
    return this.questionModel.findByIdAndDelete(id).exec();
  }
  async updateOne(id: string, body: CreateQuestionDto): Promise<Question> {
    //TODO check if user is author
    const updatedQuestion = await this.questionModel
      .findByIdAndUpdate(id, body, { new: true })
      .exec();
    return updatedQuestion;
  }
}
