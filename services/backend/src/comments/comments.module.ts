import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesAndPermissionsModule } from 'src/roles-and-permissions/roles-and-permissions.module';
import { SubTopicsModule } from 'src/subtopics/subtopics.module';
import { UsersModule } from 'src/users/users.module';
import { Comment } from './entities/comment.entity';
import { CommentsController } from './comments.controller';
import { CommentService } from './comments.service';
import { MessagesModule } from 'src/messsages/messages.module';

@Module({
  imports: [TypeOrmModule.forFeature([ Comment ]), RolesAndPermissionsModule, UsersModule, MessagesModule],
  controllers: [CommentsController],
  providers: [CommentService]
})
export class CommentsModule {}
