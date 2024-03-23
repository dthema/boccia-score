import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { LoaderInterceptor } from './loader.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalInterceptors(new LoaderInterceptor());
  app.useStaticAssets(join(__dirname, '..', 'src/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'src/views/partials'));
  const configService = app.get(ConfigService);
  let port = configService.get<number>('PORT');
  if (port == null || port === 0) {
    port = 8080;
  }

  await app.listen(port);
}
bootstrap();
