import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from 'src/modules/messages/messages.module';
import { RolesAndPermissionsModule } from 'src/modules/permissions/roles-and-permissions.module';
import { UsersModule } from 'src/modules/auth/users/users.module';
import { CommentsController } from 'src/modules/comments/comments.controller';
import { CommentService } from 'src/modules/comments/comments.service';
import { Comment } from 'src/modules/comments/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), RolesAndPermissionsModule, UsersModule, MessagesModule],
  controllers: [CommentsController],
  providers: [CommentService],
  exports: [CommentService]
})
export class CommentsModule { }
