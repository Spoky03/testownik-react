import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Questions } from 'src/interfaces/questions.interface';
import { QuestionSet } from 'src/interfaces/questionSet.interface';
import { UsersService } from 'src/users/users.service';
import { CreateQuestionSetDto } from 'src/dto/create-questionSet.dto';
import { AppendQuestionDto } from 'src/dto/create-question.dto';
import { User, UserReq } from 'src/interfaces/user.interface';

@Injectable()
export class QuestionsSetsService {
  constructor(
    @Inject('QUESTIONSET_MODEL')
    private questionsSetsModel: Model<QuestionSet>,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<QuestionSet[]> {
    //find all questionssets private = false
    return this.questionsSetsModel
      .find({ private: false })
      .populate('author', 'username')
      .exec();
  }
  async create(
    createQuestionSetDto: CreateQuestionSetDto,
    user,
  ): Promise<QuestionSet> {
    const foundUser = await this.usersService.findById(user.sub);
    if (!foundUser) {
      throw new Error('User not found');
    }
    createQuestionSetDto.author = foundUser._id.toString();
    const createdQuestionSet = new this.questionsSetsModel(
      createQuestionSetDto,
    );
    await this.usersService.pushQuestionSet(
      foundUser._id.toString(),
      createdQuestionSet._id.toString(),
    );
    return createdQuestionSet.save();
  }
  async appendQuestion(
    appendQuestionDto: AppendQuestionDto,
    user,
  ): Promise<QuestionSet> {
    const foundSet = await this.questionsSetsModel.findByIdAndUpdate(
      appendQuestionDto.id,
      {
        $push: { questions: appendQuestionDto.question },
      },
    );
    if (!foundSet) {
      throw new Error('Set not found');
    }
    return foundSet;
  }
  async getOne(id: string, user: any): Promise<QuestionSet> {
    return this.questionsSetsModel.findById(id).exec();
  }
  async deleteOne(id: string, user: any): Promise<QuestionSet> {
    return this.questionsSetsModel.findByIdAndDelete(id).exec();
  }
  // async pushForeignToUser(
  //   user: UserReq,
  //   questionSetId: string,
  // ): Promise<User['foreignQuestionSets']> {
  //   const modifiedUser = await this.usersService.pushForeignQuestionSet(
  //     user.sub,
  //     questionSetId,
  //   );
  //   console.log(modifiedUser.foreignQuestionSets);
  //   return modifiedUser.foreignQuestionSets;
  // }
}
