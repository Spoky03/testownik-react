import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class OpenaiService {
  constructor(@Inject('GenerativeModel') private readonly model: any) {}

  async askChat(message: string): Promise<string> {
    console.log(message);
    try {
      const result = await this.model.generateContent([message]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to generate content',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
