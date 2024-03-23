import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CompetitionService } from './competition.service';

@Module({
  imports: [HttpModule],
  providers: [CompetitionService],
  exports: [CompetitionService],
})
export class CompetitionModule {}
