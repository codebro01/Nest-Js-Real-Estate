import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DrizzleExceptionFilter } from '@src/filters/drizzle-exception.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalFilters(new DrizzleExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
