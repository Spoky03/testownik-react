import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateChatCompletionRequest {
  @IsString()
  questionId: string;

  @IsArray()
  messages: ChatCompletionMessageDto[];
}

export class ChatCompletionMessageDto {
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
