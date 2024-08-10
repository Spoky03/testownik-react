import { Module } from '@nestjs/common';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [OpenaiController],
  imports: [ConfigModule],
  providers: [
    OpenaiService,
    {
      provide: GoogleGenerativeAI,
      useFactory: (configService: ConfigService) => {
        return new GoogleGenerativeAI(
          configService.get<string>('GOOGLE_AI_KEY'),
        );
      },
      inject: [ConfigService],
    },
    {
      provide: 'GenerativeModel',
      useFactory: (genAi: GoogleGenerativeAI) => {
        return genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });
      },
      inject: [GoogleGenerativeAI],
    },
  ],
})
export class OpenaiModule {}
