import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Question, Questions } from 'src/interfaces/questions.interface';
import {
  AppendQuestionsDto,
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
  async appendQuestions(
    appendQuestionsDto: AppendQuestionsDto,
    userId: string,
  ): Promise<Question[]> {
    const user = await this.usersModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const questionSet = await this.questionsSetsModel.findById(
      appendQuestionsDto.id,
    );
    if (!questionSet) {
      throw new Error('Question set not found');
    }
    if (questionSet.author.toString() !== user._id.toString()) {
      throw new Error('You are not the author of this question set');
    }
    // Ensure questions is an array
    const questions = await this.questionModel.create(
      appendQuestionsDto.questions,
    );
    const questionsArray = Array.isArray(questions) ? questions : [questions];
    questionSet.questions.push(...questionsArray);
    await questionSet.save();
    return questionsArray;
  }
  async deleteOne(id: string, userId: string): Promise<Question> {
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
  // async findQuestionsNotInSet(setId: string): Promise<Question[]> {
  //   return this.questionModel.find({ _id: { $nin: setId } }).exec();
  // }
  // async findQuestionsNotInAnySet(): Promise<Question[]> {
  //   return this.questionModel.find({ questionSet: { $exists: false } }).exec();
  // }
  async deleteQuestionsNotInAnySet(): Promise<{
    deleted: number;
    found: number;
  }> {
    const allQuestions = await this.questionModel.find().exec();
    const allQuestionInSets = await this.questionsSetsModel
      .find({}, 'questions')
      .exec();
    const questionsNotInAnySet = allQuestions.filter(
      (question: Question) =>
        !allQuestionInSets.some((set) => set.questions.includes(question.id)),
    );
    const deleted = await this.questionModel
      .deleteMany({ _id: { $in: questionsNotInAnySet.map((q) => q._id) } })
      .exec();
    return {
      deleted: deleted.deletedCount,
      found: questionsNotInAnySet.length,
    };
  }
}
