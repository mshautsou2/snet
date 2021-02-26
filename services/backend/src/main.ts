import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);

  if (config.get('NODE_ENV') === 'development') {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Ietm API')
        .setDescription('My Item API')
        .build(),
    );
    SwaggerModule.setup('docs', app, document);
  }

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
