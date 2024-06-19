import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, Progress } from 'src/interfaces/user.interface';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { SaveQuestionSetProgressDto } from 'src/dto/save-userProgress.dto';
import * as bcrypt from 'bcrypt';
import { QuestionSet } from 'src/interfaces/questionSet.interface';
import { GetUserDto } from 'src/dto/get-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    @Inject('QUESTIONSET_MODEL')
    private questionSetModel: Model<QuestionSet>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findById(id: string): Promise<GetUserDto> {
    const user = await this.userModel
      .findById(id)
      .populate([
        {
          path: 'questionSets',
          populate: {
            path: 'questions',
          },
        },
      ])
      .exec();
    if (!user || !user._id) {
      throw new NotFoundException('User not found');
    }
    const userDto: GetUserDto = {
      username: user.username,
      progress: user.progress,
      bookmarks: user.bookmarks,
      questionSets: user.questionSets,
      _id: null,
      password: user.password,
    };
    return plainToInstance(GetUserDto, userDto, {
      excludeExtraneousValues: true,
    });
  }
  async findByName(username: string): Promise<User | undefined> {
    return this.userModel
      .findOne({ username })
      .populate({
        path: 'questionSets',
        populate: {
          path: 'questions',
        },
      })
      .exec();
  }
  async pushQuestionSet(userId: string, questionSetId: string): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $push: { questionSets: questionSetId } },
        { new: true },
      )
      .exec();
  }
  async pullQuestionSet(userId: string, questionSetId: string): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $pull: { questionSets: questionSetId } },
        { new: true },
      )
      .exec();
  }
  // async pushForeignQuestionSet(
  //   userId: string,
  //   questionSetId: string,
  // ): Promise<User> {
  //   return this.userModel
  //     .findByIdAndUpdate(
  //       userId,
  //       { $addToSet: { foreignQuestionSets: questionSetId } },
  //       { new: true },
  //     )
  //     .populate([
  //       {
  //         path: 'foreignQuestionSets',
  //         populate: [
  //           {
  //             path: 'questions',
  //           },
  //           {
  //             path: 'author',
  //             select: 'username',
  //           },
  //         ],
  //       },
  //     ])
  //     .exec();
  // }
  async create(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(user);
    createdUser.password = await bcrypt.hash(user.password, 10);
    return createdUser.save();
  }
  async saveProgress(progress: Progress, userId: string): Promise<Progress[]> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
    // if questionSetId is not in progress
    const progressIndex = user.progress.findIndex(
      (p) => p.questionSetId === progress.questionSetId,
    );
    if (progressIndex === -1) {
      user.progress.push(progress);
    } else {
      user.progress[progressIndex] = progress;
    }
    const savedUser = await user.save();
    return savedUser.progress;
  }
  async getProgress(userId: string): Promise<Progress[]> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
    return user.progress;
  }
  async resetProgress(id: string, userId: string): Promise<Progress[]> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
    const progressIndex = user.progress.findIndex(
      (p) => p.questionSetId.toString() === id,
    );
    if (progressIndex === -1) {
      throw new Error('Progress not found');
    }
    user.progress.splice(progressIndex, 1);
    const savedUser = await user.save();
    return savedUser.progress;
  }
  async addBookmark(id: string, userId: string): Promise<User['bookmarks']> {
    const user = await this.userModel
      .findByIdAndUpdate(userId, { $push: { bookmarks: id } }, { new: true })
      .exec();
    return user.bookmarks;
  }
  async deleteBookmark(id: string, userId: string): Promise<User['bookmarks']> {
    const user = await this.userModel
      .findByIdAndUpdate(userId, { $pull: { bookmarks: id } }, { new: true })
      .exec();
    return user.bookmarks;
  }
  async getBookmarkedForeignQuestionSets(userId: string): Promise<any> {
    const userWithBookmarks = await this.userModel
      .findById(userId)
      .populate({
        path: 'bookmarks',
      })
      .exec();

    if (!userWithBookmarks) {
      throw new Error('User not found');
    }

    // Filter to get IDs of foreign question sets
    const foreignQuestionSetIds = (
      userWithBookmarks.bookmarks as unknown as QuestionSet[]
    )
      .filter((bookmark) => bookmark.author.toString() !== userId)
      .map((bookmark) => bookmark._id);

    // Now, populate the foreign question sets with questions and author details
    const populatedForeignQuestionSets = await this.questionSetModel
      .find({
        _id: { $in: foreignQuestionSetIds },
      })
      .populate('questions')
      .populate({
        path: 'author',
        select: 'username',
      })
      .exec();

    return populatedForeignQuestionSets;
  }
}
