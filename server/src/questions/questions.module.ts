import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { questionProviders } from './questions.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, ...questionProviders],
})
export class QuestionsModule {}
