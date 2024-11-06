import { Injectable, Logger } from '@nestjs/common';
import { Interval, Timeout } from '@nestjs/schedule';
import { QuestionsService } from 'src/questions/questions.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private readonly questionsService: QuestionsService;
  private readonly usersService: UsersService;
  constructor(questionsService: QuestionsService, usersService: UsersService) {
    this.questionsService = questionsService;
    this.usersService = usersService;
  }
  @Interval(1000 * 60 * 60 * 2) // every 2 hours
  async handleInterval() {
    const { deleted, found } =
      await this.questionsService.deleteQuestionsNotInAnySet();
    this.logger.debug(
      `${found} questions found not in any set. Delted ${deleted} of them.`,
    );
  }
  // @Cron('0 0 0 * * *') // every day at midnight
  // async handleCron() {
  //   const { message, count } =
  //     await this.usersService.saveGlobalStatsAllUsers();
  //   this.logger.debug(`${message}. ${count} stats saved.`);
  // }
  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Cron working fine');
  }
}
