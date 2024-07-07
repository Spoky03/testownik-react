import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { QuestionSet } from 'src/interfaces/questionSet.interface';
import { UsersService } from 'src/users/users.service';
import {
  CreateQuestionSetDto,
  EditQuestionSetDto,
} from 'src/dto/create-questionSet.dto';

@Injectable()
export class QuestionsSetsService {
  constructor(
    @Inject('QUESTIONSET_MODEL')
    private questionsSetsModel: Model<QuestionSet>,
    private usersService: UsersService,
  ) {}
  // .populate([
  //   {
  //     path: 'questionSets',
  //     populate: {
  //       path: 'questions',
  //     },
  //   },
  // ])
  async findAll(userId?: string): Promise<any[]> {
    //find all questionssets private = false
    const sets = await this.questionsSetsModel
      .find({ private: false })
      .populate([
        {
          path: 'author',
          select: 'username _id',
        },
        {
          path: 'questions',
        },
      ])
      .exec();
    if (!userId) {
      return sets.map((set) => ({
        ...set.toObject(), // Assuming set is a Mongoose document. Use set.toObject() if _doc doesn't work
        likes: set.likes.length,
        liked: false,
      }));
    }
    return sets.map((set) => ({
      ...set.toObject(), // Assuming set is a Mongoose document. Use set.toObject() if _doc doesn't work
      likes: set.likes.length,
      liked: set.likes.includes(userId),
    }));
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
  async edit(
    editQuestionSetDto: EditQuestionSetDto,
    id: string,
    user: { sub: string },
  ): Promise<Omit<QuestionSet, 'likes'> & { likes: number }> {
    const foundUser = await this.usersService.findById(user.sub);
    if (!foundUser) {
      throw new Error('User not found');
    }
    editQuestionSetDto.author = foundUser._id.toString();
    await this.questionsSetsModel.findByIdAndUpdate(id, editQuestionSetDto, {
      new: true,
    });
    const mySets = await this.questionsSetsModel
      .findById(id)
      // .populate('author')
      .populate('questions')
      .exec();
    return {
      ...mySets.toObject(),
      likes: mySets.likes.length,
    };
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
    //also delete the set from the user's questionSets
    await this.usersService.pullQuestionSet(user.sub, id);
    // also remove questions from the set
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
  async likeSet(
    id: string,
    userId: string,
  ): Promise<{ likes: number; liked: boolean }> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const foundSet = await this.questionsSetsModel.findById(id);
    if (!foundSet) {
      throw new Error('Question set not found');
    }

    const update = foundSet.likes.includes(user._id.toString())
      ? { $pull: { likes: user._id } } // If user has already liked the set, pull (remove) their ID from likes
      : { $addToSet: { likes: user._id } }; // If user hasn't liked the set, add their ID to likes

    await this.questionsSetsModel.findByIdAndUpdate(id, update);

    // After updating, fetch the set again to count the likes
    const updatedSet = await this.questionsSetsModel.findById(id);
    return {
      likes: updatedSet.likes.length,
      liked: updatedSet.likes.includes(user._id.toString()),
    };
  }
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
