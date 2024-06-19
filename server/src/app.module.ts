import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuestionsModule } from './questions/questions.module';
import { QuestionsSetsModule } from './questionsSets/questionsSets.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [
    QuestionsModule,
    UsersModule,
    QuestionsSetsModule,
    ConfigModule.forRoot(),
    AuthModule,
    ScheduleModule.forRoot(),
    TasksModule,
  ],
})
export class AppModule {}
