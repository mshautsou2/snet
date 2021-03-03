import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { CategoryModule } from 'src/modules/categories/categories.module';
import { ChatModule } from 'src/modules/chat/chat.module';
import { CommentsModule } from 'src/modules/comments/comments.module';
import { MessagesModule } from 'src/modules/messages/messages.module';
import { Permission } from './roles-and-permissions/entities/permission.entity';
import { PermissionsGuard } from './roles-and-permissions/guards/permissions.guard';
import { RolesAndPermissionsModule } from './roles-and-permissions/roles-and-permissions.module';
import { PermissionService } from './roles-and-permissions/services/permission.service';
import { RolesAndPermissionsService } from './roles-and-permissions/services/roles-and-permissions.service';
import { RolesService } from './roles-and-permissions/services/roles.service';
import { SubTopicsModule } from './subtopics/subtopics.module';
import { TopicsModule } from './topics/topics.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    TypeOrmModule.forFeature([Permission]),
    RolesAndPermissionsModule,
    UsersModule,
    CategoryModule,
    TopicsModule,
    SubTopicsModule,
    MessagesModule,
    CommentsModule,
    ChatModule,
  ],
  controllers: [UsersController],
  providers: [{ provide: 'APP_GUARD', useClass: PermissionsGuard }],
})
export class AppModule {
  constructor(private permissionService: PermissionService, private roleService: RolesService, private rolePermissionService: RolesAndPermissionsService) {
  }

}
