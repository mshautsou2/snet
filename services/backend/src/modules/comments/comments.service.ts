import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageService } from 'src/modules/messages/messages.service';
import { UsersService } from 'src/modules/users/users.service';
import { Repository } from 'typeorm';
import { Comment } from 'src/modules/comments/comment.entity';
import { PermissionsKeys } from '../roles-and-permissions/constants/permissions-keys.constants';
import { RolesAndPermissionsService } from '../roles-and-permissions/services/roles-and-permissions.service';
import { NotFoundError } from 'src/errors/NotFoundError';
import { CommentRepository } from './comments.repository';

@Injectable()
export class CommentService {

  constructor(
    private commentRepository: CommentRepository,
    private userService: UsersService,
    private messagesService: MessageService,
    private rolesPermissionService: RolesAndPermissionsService,
  ) { }

  async create(commentBody: Comment, messageId: string, ownerId: string) {
    const message = await this.messagesService.findOne(messageId);
    const owner = await this.userService.findOne(ownerId);

    if (!message) {
      throw new NotFoundError(`Message with id "${messageId}" not found`);
    }
    return await this.commentRepository.save({
      ...commentBody,
      owner,
      message,
    })
  }

  async checkCommentPermission(userId: string, commentId: string) {
    const isEntityOwner = await this.isOwner(userId, commentId);
    const perissionToCheck = isEntityOwner ? PermissionsKeys.EditSelfComment : PermissionsKeys.EditAnyComment
    const accessGranted = await this.rolesPermissionService.checkPermissions(userId, perissionToCheck);
    return accessGranted;
  }


  async isOwner(userId: string, commentId: string) {
    return await this.commentRepository.isOwner(userId, commentId)
  }

  async findAll() {
    return await this.commentRepository.find();
  }

  async findOne(id: string) {
    const comment = await this.commentRepository.findOne(id);
    this.failIfNotExists(comment)
    return comment;
  }

  async update(id: string, body: Comment) {
    const toUpdate = await this.commentRepository.findOne(id);
    this.failIfNotExists(toUpdate)
    return await this.commentRepository.save({
      ...toUpdate,
      ...body,
      owner: toUpdate.owner,
      message: toUpdate.message,
    });
  }

  async remove(id: string) {
    const toDelete = await this.commentRepository.findOne(id);
    this.failIfNotExists(toDelete);
    return await this.commentRepository.remove(toDelete);
  }

  private failIfNotExists(comment?: Comment) {
    if (!comment) {
      throw new NotFoundError('Comment not found')
    }
  }

}
