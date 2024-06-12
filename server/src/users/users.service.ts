import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, Progress } from 'src/interfaces/user.interface';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { SaveQuestionSetProgressDto } from 'src/dto/save-userProgress.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findById(id: string): Promise<User | undefined> {
    return this.userModel
      .findById(id)
      .populate({
        path: 'questionSets',
        populate: {
          path: 'questions',
        },
      })
      .exec();
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
  async create(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
  async saveProgress(
    progress: SaveQuestionSetProgressDto,
    userId: string,
  ): Promise<Progress> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
    if (!progress.questionSetId) {
      throw new Error('questionSetId is required');
    }
    // if questionSetId is not in progress
    const progressIndex = user.progress.findIndex(
      (p) => p.questionSetId.toString() === progress.questionSetId,
    );
    if (progressIndex === -1) {
      user.progress.push(progress);
    } else {
      user.progress.set(progressIndex, progress);
    }
    const savedUser = await user.save();
    return savedUser.progress;
  }
  async getProgress(userId: string): Promise<Progress> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
    return user.progress;
  }
  async resetProgress(id: string, userId: string): Promise<Progress> {
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
}
