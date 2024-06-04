import { Module } from '@nestjs/common';
import { QuestionsSetsController } from './questionsSets.controller';
import { QuestionsSetsService } from './questionsSets.service';
import { questionSetsProviders } from './questionsSets.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [QuestionsSetsController],
  providers: [QuestionsSetsService, ...questionSetsProviders],
})
export class QuestionsSetsModule {}
