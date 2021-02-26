import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { Permission } from './roles-and-permissions/entities/permission.entity';
import { RolesAndPermissionsModule } from './roles-and-permissions/roles-and-permissions.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { PermissionsGuard } from './roles-and-permissions/guards/permissions.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    TypeOrmModule.forFeature([Permission]),
    RolesAndPermissionsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, { provide: 'APP_GUARD', useClass: PermissionsGuard }],
})
export class AppModule {}
