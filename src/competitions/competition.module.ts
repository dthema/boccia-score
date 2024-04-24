import { Module } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { CompetitionController } from './competition.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [CompetitionService, PrismaService],
  exports: [CompetitionService],
  controllers: [CompetitionController],
})
export class CompetitionModule {}
