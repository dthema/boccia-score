import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { PrismaService } from '../prisma.service';
import { GameController } from './game.controller';

@Module({
  providers: [GameService, PrismaService],
  exports: [GameService],
  controllers: [GameController],
})
export class GameModule {}
