import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerConfigs } from './core/configs/swagger.configs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({ origin: process.env.FRONTEND_URL?.split(',') ?? true });
  // Konstruktor tayyor rasmni base64 ko'rinishida yuboradi
  app.useBodyParser('json', { limit: '5mb' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  SwaggerConfigs(app);

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
