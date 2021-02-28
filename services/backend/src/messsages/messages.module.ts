import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesAndPermissionsModule } from 'src/roles-and-permissions/roles-and-permissions.module';
import { SubTopicsModule } from 'src/subtopics/subtopics.module';
import { UsersModule } from 'src/users/users.module';
import { Message } from './entities/message.entity';
import { MessagesController } from './messages.controller';
import { MessageService } from './messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([ Message ]), RolesAndPermissionsModule, UsersModule, SubTopicsModule],
  controllers: [MessagesController],
  providers: [MessageService]
})
export class MessagesModule {}
