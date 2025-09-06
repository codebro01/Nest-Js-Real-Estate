import * as dotenv from 'dotenv';
dotenv.config()
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DrizzleExceptionFilter } from '@src/filters/drizzle-exception.filter';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new DrizzleExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
