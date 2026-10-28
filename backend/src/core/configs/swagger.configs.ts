import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function SwaggerConfigs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Cardinar.uz API')
    .setDescription('Avtochexollar, poliklar va konstruktor uchun backend')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  SwaggerModule.setup('swagger', app, SwaggerModule.createDocument(app, config));
}
