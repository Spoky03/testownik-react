import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { QuestionsModule } from 'src/questions/questions.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [QuestionsModule, UsersModule],
  providers: [TasksService],
})
export class TasksModule {}
