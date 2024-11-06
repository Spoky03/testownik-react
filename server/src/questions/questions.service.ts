import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Question, Questions } from 'src/interfaces/questions.interface';
import {
  AppendQuestionsDto,
  CreateQuestionDto,
} from '../dto/create-question.dto';
import { DifficultyVoteDto } from './dto/difficulty-vote.dto';
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
    console.log(appendQuestionsDto.questions);
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
    // TODO this is inefficient
    const question = await this.questionModel.findById(id);
    if (!question) {
      throw new HttpException('Question not found', 404);
    }
    const questionSet = await this.questionsSetsModel.findOne({
      questions: id,
    });
    if (!questionSet) {
      throw new HttpException('Question not found in any set', 404);
    }
    if (questionSet.author.toString() !== userId) {
      throw new HttpException(
        'You are not the author of this question set',
        403,
      );
    }
    await this.questionsSetsModel
      .updateMany({ questions: id }, { $pull: { questions: id } })
      .exec();
    return this.questionModel.findByIdAndDelete(id).exec();
  }
  async getOne(id: string): Promise<Question> {
    return this.questionModel.findById(id).exec();
  }
  async updateOne(
    id: string,
    body: CreateQuestionDto,
    userId: string,
  ): Promise<Question> {
    //TODO
    const question = await this.questionModel.findById(id);
    if (!question) {
      throw new HttpException('Question not found', 404);
    }
    const questionSet = await this.questionsSetsModel.findOne({
      questions: id,
    });
    if (!questionSet) {
      throw new HttpException('Question not found in any set', 404);
    }
    if (questionSet.author.toString() !== userId) {
      throw new HttpException(
        'You are not the author of this question set',
        403,
      );
    }
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
  async setExplanation(id: string, explanation: string): Promise<string> {
    const question = await this.questionModel.findById(id);
    question.explanation = explanation;
    await question.save();
    return explanation;
  }
  async incrementReport(id: string): Promise<number> {
    const question = await this.questionModel.findById(id);
    question.report++;
    await question.save();
    return question.report;
  }
  async voteDifficulty(
    questionId: string,
    DifficultyVoteDto: DifficultyVoteDto,
    userId: string,
  ) {
    const question = await this.questionModel.findById(questionId);
    const user = await this.usersModel.findById(userId);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    if (!question) {
      throw new HttpException('Question not found', 404);
    }
    // Check if user has already voted
    if (question.difficulty.some((vote) => vote.user === userId)) {
      // Remove previous vote
      question.difficulty = question.difficulty.filter(
        (vote) => vote.user !== userId,
      );
    }
    question.difficulty.push({ user: userId, value: DifficultyVoteDto.value });
    await question.save();
    return question.difficulty;
  }
}
