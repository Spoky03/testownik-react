import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ReportExplanation } from './dto/reportExplanation.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { QuestionsService } from 'src/questions/questions.service';
@Injectable()
export class OtherService {
  constructor(
    @Inject(MailerService)
    private readonly mailerService: MailerService,
    private readonly questionsService: QuestionsService,
  ) {}

  async reportExplanation(body: ReportExplanation) {
    try {
      // increment the report count of the explanation
      await this.questionsService.incrementReport(body.questionId);
      // Send an email to the admin with the explanation report
      await this.mailerService.sendMail({
        to: 'stefangrzelec@gmail.com',
        from: 'spoky.cpg@gmail.com',
        subject: 'Testownik - Reported explanation',
        html: `<p>Reason: ${body.reason}</p><p>Explanation: ${body.explanation}</p>`,
      });
      return 'Explanation reported successfully!';
    } catch (error) {
      throw new HttpException('There was a problem with your request.', 500);
    }
  }
}
