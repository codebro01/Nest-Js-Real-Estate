import * as dotenv from 'dotenv';
dotenv.config()
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DrizzleExceptionFilter } from '@src/filters/drizzle-exception.filter';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new DrizzleExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const config = new DocumentBuilder()
    .setTitle('Real Estate API') // Title of your docs
    .setDescription('Reap estate api') // Small description
    .setVersion('1.0') // Version
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/api-docs', app, document); // localhost:3000/api-docs
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
