import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AthleteDto } from './athlete/dto/athlete.dto';

function athleteFullNameString(athlete) {
  if (athlete == undefined) return '';
  return (
    athlete.lastName + ' ' + athlete.firstName + ' ' + athlete.patronymicName
  );
}

function initHbsHelpers() {
  hbs.registerHelper('json', function (obj) {
    return JSON.stringify(obj);
  });

  hbs.registerHelper('inc', function (num: number) {
    return num + 1;
  });

  hbs.registerHelper('parseAthleteName', function (athlete: AthleteDto) {
    return athleteFullNameString(athlete);
  });

  hbs.registerHelper('formatDate', function (date: Date) {
    return (
      date.getFullYear() +
      '-' +
      fillZero(date.getMonth() + 1) +
      '-' +
      fillZero(date.getDate())
    );
  });
}

function fillZero(num) {
  if (num < 10) return '0' + num;
  return num;
}

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
  initHbsHelpers();

  const config = new DocumentBuilder()
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
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
