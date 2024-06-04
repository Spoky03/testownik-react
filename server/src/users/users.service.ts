import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/user.interface';
import { CreateUserDto } from 'src/dto/create-user.dto';

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
}
