import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Questions } from 'src/interfaces/questions.interface';
import { UsersService } from 'src/users/users.service';
import { CreateQuestionSetDto } from 'src/dto/create-questionSet.dto';

@Injectable()
export class QuestionsSetsService {
  constructor(
    @Inject('QUESTIONSET_MODEL')
    private questionsSetsModel: Model<Questions>,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<Questions[]> {
    return this.questionsSetsModel.find().exec();
  }
  async create(
    createQuestionSetDto: CreateQuestionSetDto,
    user,
  ): Promise<Questions> {
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
}
