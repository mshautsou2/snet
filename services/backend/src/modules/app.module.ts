import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { PermissionsGuard } from 'src/guards/permissions.guard';
import { UserMiddleware } from 'src/middleware/user.middleware';
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
  providers: [{ provide: 'APP_GUARD', useClass: PermissionsGuard }],
  controllers: [UsersController, PermissionController, RoleController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
