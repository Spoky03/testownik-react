import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatCompletionRequest {
  @IsString()
  questionId: string;
}

export class ChatCompletionMessageDto {
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
