import { Injectable, Logger } from '@nestjs/common';
import { Interval, Timeout } from '@nestjs/schedule';
import { QuestionsService } from 'src/questions/questions.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private readonly questionsService: QuestionsService;
  constructor(questionsService: QuestionsService) {
    this.questionsService = questionsService;
  }
  //   @Cron('45 * * * * *')
  //   handleCron() {
  //     this.logger.debug('Called when the second is 45');
  //   }

  @Interval(1000 * 60 * 60 * 2) // every 2 hours
  async handleInterval() {
    const { deleted, found } =
      await this.questionsService.deleteQuestionsNotInAnySet();
    // Log the result or handle it as needed
    this.logger.debug(
      `${found} questions found not in any set. Delted ${deleted} of them.`,
    );
  }
  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Cron working fine');
  }
}
