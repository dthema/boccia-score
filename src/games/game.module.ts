import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
