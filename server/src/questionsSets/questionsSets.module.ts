import { Module } from '@nestjs/common';
import { QuestionsSetsController } from './questionsSets.controller';
import { QuestionsSetsService } from './questionsSets.service';
import { questionSetsProviders } from './questionsSets.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionsSetsController],
  providers: [QuestionsSetsService, ...questionSetsProviders],
})
export class QuestionsSetsModule {}
