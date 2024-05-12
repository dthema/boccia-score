import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GameModule } from './games/game.module';
import { CompetitionModule } from './competitions/competition.module';
import { AthleteModule } from './athlete/athlete.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FirebaseAdmin } from './firebase/firebase.setup';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/public'),
    }),
    ConfigModule.forRoot(),
    AthleteModule,
    GameModule,
    CompetitionModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAdmin],
})
export class AppModule {}
