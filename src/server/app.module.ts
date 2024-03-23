import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RenderModule } from 'nest-next';
import Next from 'next';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
@Module({
  controllers: [AppController],
  imports: [RenderModule.forRootAsync(Next({ dev: true }), { viewsDir: null })],
  providers: [AppService],
})
export class AppModule {}
