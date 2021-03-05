

import { Module } from '@nestjs/common';
import { CommentsModule } from 'src/modules/comments/comments.module';
import { MessagesModule } from 'src/modules/messages/messages.module';
import { RolesAndPermissionsModule } from 'src/modules/permissions/roles-and-permissions.module';
import { SubTopicsModule } from 'src/modules/subtopics/subtopics.module';
import { UsersModule } from 'src/modules/auth/users/users.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [RolesAndPermissionsModule, UsersModule, SubTopicsModule, MessagesModule, CommentsModule],
  providers: [ChatGateway],
})
export class ChatModule { }
