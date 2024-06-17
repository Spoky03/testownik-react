import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { QuestionSet } from 'src/interfaces/questionSet.interface';
import { UsersService } from 'src/users/users.service';
import { CreateQuestionSetDto } from 'src/dto/create-questionSet.dto';

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
  async getOne(id: string): Promise<QuestionSet> {
    return this.questionsSetsModel.findById(id).exec();
  }
  async deleteOne(id: string, user: any): Promise<QuestionSet> {
    if (!user) {
      throw new Error('User not found');
    }
    const foundSet = await this.questionsSetsModel.findById(id);
    if (!foundSet) {
      throw new Error('Set not found');
    }
    if (foundSet.author.toString() !== user.sub) {
      throw new Error('Not authorized');
    }
    return this.questionsSetsModel.findByIdAndDelete(id);
  }
  async changePrivacy(id: string, user: any): Promise<boolean> {
    if (!user) {
      throw new Error('User not found');
    }
    const foundSet = await this.questionsSetsModel.findById(id);
    if (!foundSet) {
      throw new Error('Set not found');
    }
    if (foundSet.author.toString() !== user.sub) {
      throw new Error('Not authorized');
    }
    const updatedSet = await this.questionsSetsModel.findByIdAndUpdate(
      id,
      {
        private: !foundSet.private,
      },
      { new: true },
    );
    return updatedSet.private;
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
