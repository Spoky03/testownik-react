import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';
@Controller('api/openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}
  @Post('ask')
  async ask(@Body() body: { message: string }): Promise<string> {
    return await this.openaiService.askChat(body.message);
  }
}
