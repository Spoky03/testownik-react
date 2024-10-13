import { Body, Controller, Post } from '@nestjs/common';
import { OtherService } from './other.service';
import { ReportExplanation } from './dto/reportExplanation.dto';

@Controller('api/other')
export class OtherController {
  constructor(private readonly otherService: OtherService) {}

  @Post('reportExplanation')
  async reportExplanation(@Body() body: ReportExplanation) {
    return this.otherService.reportExplanation(body);
  }
}
