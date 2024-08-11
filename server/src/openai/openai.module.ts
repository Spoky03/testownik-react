import { Module } from '@nestjs/common';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import OpenAI from 'openai';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuestionsService } from 'src/questions/questions.service';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  controllers: [OpenaiController],
  imports: [ConfigModule, QuestionsModule],
  providers: [
    OpenaiService,
    {
      provide: OpenAI,
      useFactory: (configService: ConfigService) =>
        new OpenAI({ apiKey: configService.getOrThrow('OPENAI_API_KEY') }),
      inject: [ConfigService, QuestionsService],
    },
  ],
})
export class OpenaiModule {}
