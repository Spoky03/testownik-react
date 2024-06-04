import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuestionsModule } from './questions/questions.module';
import { QuestionsSetsModule } from './questionsSets/questionsSets.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    QuestionsModule,
    UsersModule,
    QuestionsSetsModule,
    ConfigModule.forRoot(),
    AuthModule,
  ],
})
export class AppModule {}
