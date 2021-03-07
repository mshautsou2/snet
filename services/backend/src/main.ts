import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as csurf from 'csurf';
import * as session from 'express-session';
import { PermissionsGuard } from './guards/permissions.guard';
import { ExceptionMapperInterceptor } from './interceptors/exception-mapper.interceptor';
import { AppModule } from './modules/app.module';
import { PermissionService } from './modules/auth/permissions/permission.service';
import { RolesService } from './modules/auth/roles/roles.service';

const CSRF_PROTECTION = false;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const reflectorService = app.get(Reflector);
  const roleService = app.get(RolesService);
  const permissionService = app.get(PermissionService);

  app.useGlobalGuards(
    new PermissionsGuard(reflectorService, roleService, permissionService),
  );
  app.useGlobalInterceptors(
    new ExceptionMapperInterceptor(),
    new ClassSerializerInterceptor(reflectorService),
  );
  const DEV_ENVIRONMENT = config.get('NODE_ENV') === 'development';

  if (!DEV_ENVIRONMENT && CSRF_PROTECTION) {
    app.use(
      session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
      }),
    );

    app.use(csurf());
  }

  if (DEV_ENVIRONMENT) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('SNet Documetation')
        .addBearerAuth()
        .build(),
    );
    SwaggerModule.setup('docs', app, document);
  }

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
