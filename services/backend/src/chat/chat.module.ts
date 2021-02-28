

import { Module } from '@nestjs/common';
import { CommentsModule } from 'src/comments/comments.module';
import { MessagesModule } from 'src/messsages/messages.module';
import { RolesAndPermissionsModule } from 'src/roles-and-permissions/roles-and-permissions.module';
import { SubTopicsModule } from 'src/subtopics/subtopics.module';
import { UsersModule } from 'src/users/users.module';
import { ChatGateway } from './chat.gateway';













@Module({
  imports: [RolesAndPermissionsModule, UsersModule, SubTopicsModule, MessagesModule, CommentsModule],
  providers: [ChatGateway],
})
export class ChatModule { }
