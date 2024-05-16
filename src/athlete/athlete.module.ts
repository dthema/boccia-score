import { Module } from '@nestjs/common';
import { AthleteService } from './athlete.service';
import { PrismaService } from '../prisma.service';
import { AthleteController } from './athlete.controller';
import { FirebaseAdmin } from '../firebase/firebase.setup';

@Module({
  providers: [AthleteService, PrismaService, FirebaseAdmin],
  exports: [AthleteService],
  controllers: [AthleteController],
})
export class AthleteModule {}
