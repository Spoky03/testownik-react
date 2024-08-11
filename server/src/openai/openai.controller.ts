import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateChatCompletionRequest } from './dto/create-chat-completion-request';
import { OpenaiService } from './openai.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('api/openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @UseGuards(RolesGuard)
  @Roles(['admin', 'premium'])
  @Post('ask')
  async createChatCompletion(@Body() body: CreateChatCompletionRequest) {
    return this.openaiService.createChatCompletion(body.questionId);
  }
}
