import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { PrismaService } from '../prisma.service';
import { GameController } from './game.controller';
import { FirebaseAdmin } from '../firebase/firebase.setup';

@Module({
  providers: [GameService, PrismaService, FirebaseAdmin],
  exports: [GameService],
  controllers: [GameController],
})
export class GameModule {}
