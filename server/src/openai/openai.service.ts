/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageDto } from './dto/create-chat-completion-request';
import { ChatCompletionMessageParam } from 'openai/resources';

@Injectable()
export class OpenaiService {
  constructor(private readonly openai: OpenAI) {}

  async createChatCompletion(messages: ChatCompletionMessageDto[]) {
    // return this.openai.chat.completions.create({
    //   messages: messages as ChatCompletionMessageParam[],
    //   model: 'gpt-4o-mini',
    // });
    const jsonResponse = {
      id: 'chatcmpl-9v0igLCvupE8da0MjbKPuHvsamv6P',
      object: 'chat.completion',
      created: 1723374490,
      model: 'gpt-4o-mini-2024-07-18',
      choices: [
        {
          index: 0,
          message: {
            role: 'assistant',
            content:
              'There isn\'t a definitive "best" programming language; the choice depends on various factors such as the specific application, project requirements, and personal or team preferences. Here are some popular programming languages and their typical use cases:\n\n1. **Python**: Known for its simplicity and readability, Python is widely used in web development, data analysis, artificial intelligence, scientific computing, and automation.\n\n2. **JavaScript**: The go-to language for web development, JavaScript is essential for creating interactive web pages and is also used for server-side development with Node.js.\n\n3. **Java**: A versatile, platform-independent language commonly used for enterprise-level applications, mobile app development (especially Android), and large systems.\n\n4. **C#**: Primarily used for developing Windows applications and games using the Unity game engine, C# is part of the .NET framework and is suitable for various application types.\n\n5. **C++**: Known for its performance and efficiency, C++ is often used in system/software development, game development, and applications requiring high performance.\n\n6. **Go (Golang)**: Developed by Google, Go is known for its simplicity and performance, making it popular for cloud services, distributed systems, and microservices.\n\n7. **Ruby**: Best known for its use in web development with the Ruby on Rails framework, Ruby emphasizes simplicity and productivity.\n\n8. **Swift**: The primary programming language for iOS and macOS app development, Swift is designed to be easy to use and efficient.\n\n9. **R**: An excellent choice for statistical analysis and data visualization, R is popular among data scientists.\n\nUltimately, the "best" programming language for you will depend on your goals, the project you\'re working on, and the environment in which you\'ll be developing.',
            refusal: null,
          },
          logprobs: null,
          finish_reason: 'stop',
        },
      ],
      usage: {
        prompt_tokens: 15,
        completion_tokens: 361,
        total_tokens: 376,
      },
      system_fingerprint: 'fp_48196bc67a',
    };
    return jsonResponse;
  }
}
