import { Module } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { CompetitionController } from './competition.controller';
import { PrismaService } from '../prisma.service';
import { FirebaseAdmin } from '../firebase/firebase.setup';

@Module({
  providers: [CompetitionService, PrismaService, FirebaseAdmin],
  exports: [CompetitionService],
  controllers: [CompetitionController],
})
export class CompetitionModule {}
