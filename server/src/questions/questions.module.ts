import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { questionProviders } from './questions.providers';
import { DatabaseModule } from 'src/database/database.module';
import { QuestionsSetsModule } from 'src/questionsSets/questionsSets.module';
@Module({
  imports: [DatabaseModule, QuestionsSetsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, ...questionProviders],
  exports: [QuestionsService],
})
export class QuestionsModule {}
