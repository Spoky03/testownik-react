//mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail() {
    await this.mailerService.sendMail({
      to: '',
      from: '',
      subject: '',
      text: '',
      html: '',
    });
  }
}
