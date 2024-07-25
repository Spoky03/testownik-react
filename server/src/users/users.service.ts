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
  async getProgress(userId: string): Promise<Progress[]> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user.progress;
  }
  async saveProgress(progress: Progress, userId: string): Promise<Progress[]> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
    const progressIndex = user.progress.findIndex((p) => {
      return new Types.ObjectId(p.questionSetId).equals(
        new Types.ObjectId(progress.questionSetId),
      );
    });
    const globalStats = user.globalStats;
    const globalStatsIndex = globalStats.findIndex(
      (stat) =>
        stat.date.toISOString().split('T')[0] ===
        new Date().toISOString().split('T')[0],
    );
    if (progressIndex === -1) {
      user.progress.push(progress);
      if (globalStatsIndex === -1) {
        user.globalStats.push({
          date: new Date(),
          correctAnswers: progress.sidebar.correctAnswers,
          incorrectAnswers: progress.sidebar.incorrectAnswers,
          totalQuestions: progress.sidebar.totalQuestions,
          masteredQuestions: progress.sidebar.masteredQuestions,
          time: progress.sidebar.time,
        });
      } else {
        user.globalStats[globalStatsIndex] = {
          ...user.globalStats[globalStatsIndex],
          correctAnswers:
            progress.sidebar.correctAnswers +
            user.globalStats[globalStatsIndex].correctAnswers,
          incorrectAnswers:
            progress.sidebar.incorrectAnswers +
            user.globalStats[globalStatsIndex].incorrectAnswers,
          totalQuestions:
            progress.sidebar.totalQuestions +
            user.globalStats[globalStatsIndex].totalQuestions,
          masteredQuestions:
            progress.sidebar.masteredQuestions +
            user.globalStats[globalStatsIndex].masteredQuestions,
          time: progress.sidebar.time + user.globalStats[globalStatsIndex].time,
        };
      }
    } else {
      //find the difference between in data (incorrect, correct, mastered, time)
      const sidebar = user.progress[progressIndex].sidebar;
      const diff = {
        correctAnswers:
          progress.sidebar.correctAnswers - sidebar.correctAnswers,
        incorrectAnswers:
          progress.sidebar.incorrectAnswers - sidebar.incorrectAnswers,
        masteredQuestions:
          progress.sidebar.masteredQuestions - sidebar.masteredQuestions,
        time: progress.sidebar.time - sidebar.time,
      };
      //update global stats
      if (globalStatsIndex === -1) {
        user.globalStats.push({
          date: new Date(),
          correctAnswers: diff.correctAnswers,
          incorrectAnswers: diff.incorrectAnswers,
          totalQuestions: diff.correctAnswers + diff.incorrectAnswers,
          masteredQuestions: diff.masteredQuestions,
          time: diff.time,
        });
      } else {
        user.globalStats[globalStatsIndex] = {
          ...user.globalStats[globalStatsIndex],
          correctAnswers:
            diff.correctAnswers +
            user.globalStats[globalStatsIndex].correctAnswers,
          incorrectAnswers:
            diff.incorrectAnswers +
            user.globalStats[globalStatsIndex].incorrectAnswers,
          totalQuestions:
            diff.correctAnswers +
            diff.incorrectAnswers +
            user.globalStats[globalStatsIndex].totalQuestions,
          masteredQuestions:
            diff.masteredQuestions +
            user.globalStats[globalStatsIndex].masteredQuestions,
          time: diff.time + user.globalStats[globalStatsIndex].time,
        };
      }
      user.progress[progressIndex] = progress;
    }
    const savedUser = await user.save();
    return savedUser.progress;
  }
  async resetProgress(id: string, userId: string): Promise<Progress[]> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const progressIndex = user.progress.findIndex(
      (p) => p.questionSetId.toString() === id,
    );
    if (progressIndex === -1) {
      throw new HttpException('Progress not found', HttpStatus.NOT_FOUND);
    }
    // before reseting progress, save it to global stats
    // const progress = user.progress[progressIndex];
    // const globalStats = user.globalStats;
    // const globalStatsIndex = globalStats.findIndex(
    //   (stat) =>
    //     stat.date.toISOString().split('T')[0] ===
    //     new Date().toISOString().split('T')[0],
    // );
    // if (globalStatsIndex === -1) {
    //   globalStats.push({
    //     date: new Date(),
    //     correctAnswers: progress.sidebar.correctAnswers,
    //     incorrectAnswers: progress.sidebar.incorrectAnswers,
    //     totalQuestions: progress.sidebar.totalQuestions,
    //     masteredQuestions: progress.sidebar.masteredQuestions,
    //     time: progress.sidebar.time,
    //   });
    // } else {
    //   globalStats[globalStatsIndex] = {
    //     ...globalStats[globalStatsIndex],
    //     correctAnswers:
    //       progress.sidebar.correctAnswers +
    //       globalStats[globalStatsIndex].correctAnswers,
    //     incorrectAnswers:
    //       progress.sidebar.incorrectAnswers +
    //       globalStats[globalStatsIndex].incorrectAnswers,
    //     totalQuestions:
    //       progress.sidebar.totalQuestions +
    //       globalStats[globalStatsIndex].totalQuestions,
    //     masteredQuestions:
    //       progress.sidebar.masteredQuestions +
    //       globalStats[globalStatsIndex].masteredQuestions,
    //     time: progress.sidebar.time + globalStats[globalStatsIndex].time,
    //   };
    // }
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
  async getGlobalStats(
    userId: string,
    startDate?: string,
    endDate?: string,
  ): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (startDate && !endDate) {
      const globalStats = user.globalStats.find(
        (stat) => stat.date.toISOString().split('T')[0] === startDate,
      );
      if (!globalStats) {
        throw new HttpException('Stats not found', HttpStatus.NOT_FOUND);
      }
      return globalStats;
    } else if (startDate && endDate) {
      const globalStats = user.globalStats.filter(
        (stat) =>
          stat.date.toISOString().split('T')[0] >= startDate &&
          stat.date.toISOString().split('T')[0] <= endDate,
      );
      if (!globalStats) {
        throw new HttpException('Stats not found', HttpStatus.NOT_FOUND);
      }
      return globalStats;
    }
    return user.globalStats;
  }
  // async saveGlobalStats(userId: string): Promise<any> {
  //   const user = await this.userModel.findById(userId).exec();
  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  //   const progress = user.progress;
  //   // get sum of all progress
  //   console.log(progress);
  //   const globalStats = progress.reduce(
  //     (acc, curr) => {
  //       acc.correctAnswers += curr.sidebar.correctAnswers;
  //       acc.incorrectAnswers += curr.sidebar.incorrectAnswers;
  //       acc.totalQuestions += curr.sidebar.totalQuestions;
  //       acc.masteredQuestions += curr.sidebar.masteredQuestions;
  //       acc.time += curr.sidebar.time;
  //       return acc;
  //     },
  //     {
  //       correctAnswers: 0,
  //       incorrectAnswers: 0,
  //       totalQuestions: 0,
  //       masteredQuestions: 0,
  //       time: 0,
  //     },
  //   );
  //   // calcualte todays progress by comparing with last global stats
  //   // last global stats is stats from day before
  //   const lastGlobalStats = user.globalStats.find(
  //     (stat) =>
  //       stat.date.toISOString().split('T')[0] ===
  //       new Date(new Date().setDate(new Date().getDate() - 1))
  //         .toISOString()
  //         .split('T')[0],
  //   );
  //   const todaysProgress = lastGlobalStats
  //     ? {
  //         correctAnswers:
  //           globalStats.correctAnswers - lastGlobalStats.correctAnswers,
  //         incorrectAnswers:
  //           globalStats.incorrectAnswers - lastGlobalStats.incorrectAnswers,
  //         totalQuestions:
  //           globalStats.totalQuestions - lastGlobalStats.totalQuestions,
  //         masteredQuestions:
  //           globalStats.masteredQuestions - lastGlobalStats.masteredQuestions,
  //         time: globalStats.time - lastGlobalStats.time,
  //       }
  //     : globalStats;
  //   //push it with date
  //   user.globalStats.push({
  //     date: new Date(),
  //     ...todaysProgress,
  //   });
  //   await user.save();
  //   return user.globalStats;
  // }
  // async saveGlobalStatsAllUsers() {
  //   const users = await this.userModel.find().exec();
  //   users.forEach(async (user) => {
  //     const progress = user.progress;
  //     // get sum of all progress
  //     const globalStats = progress.reduce(
  //       (acc, curr) => {
  //         acc.correctAnswers += curr.sidebar.correctAnswers;
  //         acc.incorrectAnswers += curr.sidebar.incorrectAnswers;
  //         acc.totalQuestions += curr.sidebar.totalQuestions;
  //         acc.masteredQuestions += curr.sidebar.masteredQuestions;
  //         acc.time += curr.sidebar.time;
  //         return acc;
  //       },
  //       {
  //         correctAnswers: 0,
  //         incorrectAnswers: 0,
  //         totalQuestions: 0,
  //         masteredQuestions: 0,
  //         time: 0,
  //       },
  //     );
  //     // last global stats is stats from day before
  //     const lastGlobalStats = user.globalStats.find(
  //       (stat) =>
  //         stat.date.toISOString().split('T')[0] ===
  //         new Date(new Date().setDate(new Date().getDate() - 1))
  //           .toISOString()
  //           .split('T')[0],
  //     );
  //     const todaysProgress = lastGlobalStats
  //       ? {
  //           correctAnswers:
  //             globalStats.correctAnswers - lastGlobalStats.correctAnswers,
  //           incorrectAnswers:
  //             globalStats.incorrectAnswers - lastGlobalStats.incorrectAnswers,
  //           totalQuestions:
  //             globalStats.totalQuestions - lastGlobalStats.totalQuestions,
  //           masteredQuestions:
  //             globalStats.masteredQuestions - lastGlobalStats.masteredQuestions,
  //           time: globalStats.time - lastGlobalStats.time,
  //         }
  //       : globalStats;
  //     //push it with date
  //     user.globalStats.push({
  //       date: new Date(),
  //       ...todaysProgress,
  //     });
  //     await user.save();
  //   });
  //   return { message: 'Global stats saved for all users', count: users.length };
  // }
}
