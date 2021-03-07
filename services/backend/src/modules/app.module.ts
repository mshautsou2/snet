import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'config/database.config';
import { UserMiddleware } from 'middleware/user.middleware';
import { AuthModule } from './auth/auth.module';
import { PermissionController } from './auth/permissions/permission.controller';
import { RoleController } from './auth/roles/role.controller';
import { UsersController } from './auth/users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    AuthModule,
    // RolesAndPermissionsModule,
    // UsersModule,
    // CategoryModule,
    // TopicsModule,
    // SubTopicsModule,
    // MessagesModule,
    // CommentsModule,
    // ChatModule,
  ],
  controllers: [UsersController, PermissionController, RoleController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
