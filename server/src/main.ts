import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // app.use(
  //   session({
  //     secret: process.env.SESSION_SECRET,
  //     resave: true,
  //     saveUninitialized: true,
  //   }),
  // );
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(app.get(ConfigService).get('PORT'));
}
bootstrap();
