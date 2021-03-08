import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'config/database.config';
import { UserMiddleware } from 'middleware/user.middleware';
import { AuthModule } from './auth/auth.module';
import { PermissionController } from './auth/permissions/permission.controller';
import { RoleController } from './auth/roles/role.controller';
import { UserController } from './auth/users/users.controller';
import { CategoryController } from './content/category/category.controller';
import { CategoryModule } from './content/category/category.module';
import { CommentController } from './content/comments/comment.controller';
import { CommentModule } from './content/comments/comment.module';
import { MessageController } from './content/messages/message.controller';
import { MessageModule } from './content/messages/messages.module';
import { SubtopicController } from './content/subtopic/subtopic.controller';
import { SubtopicModule } from './content/subtopic/subtopic.module';
import { TopicController } from './content/topic/topic.controller';
import { TopicModule } from './content/topic/topic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    AuthModule,
    CategoryModule,
    TopicModule,
    SubtopicModule,
    MessageModule,
    CommentModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
