import { Module } from '@nestjs/common';
import { AthleteService } from './athlete.service';
import { PrismaService } from '../prisma.service';
import { AthleteController } from './athlete.controller';

@Module({
  providers: [AthleteService, PrismaService],
  exports: [AthleteService],
  controllers: [AthleteController],
})
export class AthleteModule {}
