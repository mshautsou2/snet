import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  const DEV_ENVIRONMENT = config.get('NODE_ENV') === 'development';

  const csrfProtection = true // Is it needed? https://stackoverflow.com/questions/45945951/jwt-and-csrf-differences
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
