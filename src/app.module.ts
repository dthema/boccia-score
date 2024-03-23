import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GameModule } from './games/game.module';
import { CompetitionModule } from './competitions/competition.module';
import { AthleteModule } from './athlete/athlete.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoaderInterceptor } from './loader.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AthleteModule,
    GameModule,
    CompetitionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoaderInterceptor,
    },
  ],
})
export class AppModule {}
