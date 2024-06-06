import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Questions } from 'src/interfaces/questions.interface';
import { UsersService } from 'src/users/users.service';
import { CreateQuestionSetDto } from 'src/dto/create-questionSet.dto';
import { AppendQuestionDto } from 'src/dto/create-question.dto';

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
  //IMPORTANT: this code tries to add question object to shema which has object ref,
  // either change the schema (this would nesting hell)
  // or change this endpoint to questions and add ref to the question to questionsets
  // dont forget to populate questiionSet
  async appendQuestion(
    appendQuestionDto: AppendQuestionDto,
    user,
  ): Promise<Questions> {
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
}
