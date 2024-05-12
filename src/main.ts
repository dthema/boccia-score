import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.enableCors({
    origin: ['http://localhost:3000'],
    allowedHeaders: ['content-type', 'Accept', 'Authorization'],
    credentials: true,
  });

  app.use(cookieParser());
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));

  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'src/views/partials'));

  const config = new DocumentBuilder()
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  let port = configService.get<number>('PORT');
  if (port == null || port === 0) {
    port = 8080;
  }

  await app.listen(port);
}
bootstrap();
