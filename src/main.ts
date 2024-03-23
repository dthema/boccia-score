import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('src\\static');
  const configService = app.get(ConfigService);
  let port = configService.get<number>('PORT');
  if (port == null || port === 0) {
    port = 8080;
  }
  await app.listen(port);
}
bootstrap();
