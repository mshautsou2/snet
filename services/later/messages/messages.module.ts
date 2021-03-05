import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/modules/auth/users/users.module";
import { Message } from "src/modules/messages/entities/message.entity";
import { MessagesController } from "src/modules/messages/messages.controller";
import { MessageService } from "src/modules/messages/messages.service";
import { RolesAndPermissionsModule } from "src/modules/permissions/roles-and-permissions.module";
import { SubTopicsModule } from "src/modules/subtopics/subtopics.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    RolesAndPermissionsModule,
    UsersModule,
    SubTopicsModule,
  ],
  controllers: [MessagesController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessagesModule {}
