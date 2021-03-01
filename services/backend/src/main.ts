import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as csurf from 'csurf';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  const DEV_ENVIRONMENT = config.get('NODE_ENV') === 'development';

  const csrfProtection = true
  if (!DEV_ENVIRONMENT && csrfProtection) {
    app.use(
      session({
        secret: 'my-secret', //TODO: should be moved to environment variables
        resave: false,
        saveUninitialized: false,
      }),
    );

    app.use(csurf())
  }

  if (DEV_ENVIRONMENT) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('SNet Documetation')
        .build(),
    );
    SwaggerModule.setup('docs', app, document);
  }

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
