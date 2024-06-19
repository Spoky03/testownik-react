import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  imports: [QuestionsModule],
  providers: [TasksService],
})
export class TasksModule {}
