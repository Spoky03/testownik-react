/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageDto } from './dto/create-chat-completion-request';
import { ChatCompletionMessageParam } from 'openai/resources';
import { QuestionsService } from 'src/questions/questions.service';

@Injectable()
export class OpenaiService {
  constructor(
    private readonly openai: OpenAI,
    private readonly questionsService: QuestionsService,
  ) {}

  async askForExplanation(questionId: string) {
    const question = await this.questionsService.getOne(questionId);
    if (!question) {
      throw new HttpException('Question not found', 404);
    }
    if (!question.explanation || question.explanation === '') {
      try {
        const messages: ChatCompletionMessageDto[] = [
          {
            role: 'system',
            //TODO: Subject to change
            content: `Provide short answer and short explanation for following question: ${question.question} with possible answers ${question.answers.map(
              (answer) => answer.answer,
            )}`,
          },
        ];
        const aiResponse = await this.openai.chat.completions.create({
          messages: messages as ChatCompletionMessageParam[],
          model: 'gpt-4o-mini',
          n: 1,
        });
        return await this.questionsService.setExplanation(
          questionId,
          aiResponse.choices[0].message.content,
        );
      } catch (error) {
        throw new HttpException(
          'Failed to get response from OpenAi',
          error.status,
        );
      }
    } else {
      return question.explanation;
    }
  }
  // TODO - Implement saving chat into database instead of relying on frontend
  async createChatCompletion(
    questionId: string,
    messages: ChatCompletionMessageDto[],
  ) {
    const question = await this.questionsService.getOne(questionId);
    const instructions = {
      role: 'system',
      //TODO: Subject to change
      content: `User will now ask about more details or explanation regarding this question: ${question.question} with possible answers ${question.answers.map(
        (answer) => answer.answer,
      )}. Answer prompts only about the question. Now reply that you are ready to give more details.`,
    };
    if (!question) {
      throw new HttpException('Question not found', 404);
    }
    if (true) {
      try {
        const history: ChatCompletionMessageDto[] = [instructions, ...messages];
        console.log(history);
        const aiResponse = await this.openai.chat.completions.create({
          messages: history as ChatCompletionMessageParam[],
          model: 'gpt-4o-mini',
          n: 1,
        });
        return await this.questionsService.setExplanation(
          questionId,
          aiResponse.choices[0].message.content,
        );
      } catch (error) {
        throw new HttpException(
          'Failed to get response from OpenAi',
          error.status,
        );
      }
    } else {
      // sleep for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 600));
      return 'test message';
    }
  }
}
