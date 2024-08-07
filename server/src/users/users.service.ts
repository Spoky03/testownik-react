import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { User, Progress } from 'src/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { QuestionSet } from 'src/interfaces/questionSet.interface';
import { UserEntity } from 'src/dto/get-user.dto';
import { SignUpDto } from 'src/dto/signup-user.dto';
import { SettingsDto } from './dto/save-settings.dto';
import { UpdateUserEntity } from './dto/update-user.dto';

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
  async findById(id: string): Promise<UserEntity> {
    const user = await this.userModel
      .findById(id)
      .populate([
        {
          path: 'questionSets',
          populate: [
            {
              path: 'questions',
            },
            {
              path: 'author',
              select: 'username',
            },
          ],
        },
      ])
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const userDto: UserEntity = {
      _id: new Types.ObjectId(user._id).toHexString(),
      username: user.username,
      email: user.email,
      bookmarks: user.bookmarks.map((bookmark) => {
        return new Types.ObjectId(bookmark).toHexString();
      }),
      settings: user.settings,
      questionSets: user.questionSets.map((questionSet) => {
        return {
          _id: new Types.ObjectId(questionSet._id).toHexString(),
          author: new UserEntity({
            _id: new Types.ObjectId(questionSet.author._id).toHexString(),
            username: questionSet.author.username,
          }),
          name: questionSet.name,
          private: questionSet.private,
          likes: questionSet.likes.length,
          description: questionSet.description,
          questions: questionSet.questions.map((question) => {
            return {
              _id: new Types.ObjectId(question._id).toHexString(),
              question: question.question,
              answers: question.answers,
            };
          }),
          metaData: questionSet.metaData,
        };
      }),
      progress: user.progress.map((progress) => {
        return {
          questionSetId: new Types.ObjectId(
            progress.questionSetId,
          ).toHexString(),
          questions: progress.questions.map((question) => {
            return {
              id: new Types.ObjectId(question.id).toHexString(),
              repeats: question.repeats,
            };
          }),
          sidebar: {
            correctAnswers: progress.sidebar.correctAnswers,
            incorrectAnswers: progress.sidebar.incorrectAnswers,
            totalQuestions: progress.sidebar.totalQuestions,
            masteredQuestions: progress.sidebar.masteredQuestions,
            time: progress.sidebar.time,
          },
        };
      }),
    };
    return userDto;
  }
  async updateMe(userData: UpdateUserEntity, userId: string) {
    if (!userData.currentPassword || !userData.newPassword) {
      //for now omit username
      const userDataOmit = { email: userData.email };
      return this.userModel
        .findByIdAndUpdate(userId, userDataOmit, { new: true })
        .exec();
    } else {
      const user = await this.userModel.findById(userId).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const isPasswordValid = await bcrypt.compare(
        userData.currentPassword,
        user.password,
      );
      if (!isPasswordValid) {
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
      }
      user.password = await bcrypt.hash(userData.newPassword, 10);
      return user.save();
    }
  }
  async deleteMe(userId: string) {
    return this.userModel.findByIdAndDelete(userId).exec();
  }
  async findByName(username: string): Promise<User | undefined> {
    return this.userModel
      .findOne({ username })
      .populate({
        path: 'questionSets',
        populate: [
          {
            path: 'questions',
          },
        ],
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
  async create(user: SignUpDto): Promise<User> {
    const existingEmail = await this.userModel.findOne({
      email: user.email,
    });
    if (existingEmail) {
      throw new HttpException(
        'Account with that email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const existingUser = await this.userModel.findOne({
      username: user.username,
    });
    if (existingUser) {
      throw new HttpException('This username is taken', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(user);
    createdUser.password = await bcrypt.hash(user.password, 10);
    return createdUser.save();
  }
  async saveSettings(settings: SettingsDto, userId: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { settings },
      { new: true },
    );
  }
  async saveProgress(progress: Progress, userId: string): Promise<Progress[]> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
    const progressIndex = user.progress.findIndex((p) => {
      return new Types.ObjectId(p.questionSetId).equals(
        new Types.ObjectId(progress.questionSetId),
      ); // Step 2: Convert and compare
    });
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
