import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { AuthModule } from './auth/auth.module';

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
  // providers: [{ provide: 'APP_GUARD', useClass: PermissionsGuard }],
})
export class AppModule {}
