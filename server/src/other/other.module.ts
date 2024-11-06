import { Module } from '@nestjs/common';
import { OtherController } from './other.controller';
import { OtherService } from './other.service';
import { QuestionsModule } from 'src/questions/questions.module';
@Module({
  imports: [QuestionsModule],
  controllers: [OtherController],
  providers: [OtherService],
  exports: [OtherService],
})
export class OtherModule {}
