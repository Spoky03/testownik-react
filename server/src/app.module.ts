import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { QuestionsModule } from './questions/questions.module';
import { QuestionsSetsModule } from './questionsSets/questionsSets.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { join } from 'path';
@Module({
  imports: [
    QuestionsModule,
    UsersModule,
    QuestionsSetsModule,
    ConfigModule.forRoot(),
    AuthModule,
    ScheduleModule.forRoot(),
    TasksModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // 'public' is the directory where your React build is located
    }),
  ],
})
export class AppModule {}
