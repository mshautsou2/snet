import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageService } from 'src/modules/messages/messages.service';
import { UsersService } from 'src/modules/users/users.service';
import { Repository } from 'typeorm';
import { CreateCommentDTO } from 'src/modules/comments/dto/create-comment.dto';
import { UpdateCommentDTO } from 'src/modules/comments/dto/update-comment.dto';
import { Comment } from 'src/modules/comments/entities/comment.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private repository: Repository<Comment>,
    private userService: UsersService,
    private messagesService: MessageService,
  ) { }

  async create(createCommentDTO: CreateCommentDTO) {
    const message = await this.messagesService.findOne(createCommentDTO.messageId);

    if (!message) {
      throw new NotFoundException(`Message with id "${createCommentDTO.messageId}" not found`);
    }
    return await this.repository.save({
      ...createCommentDTO,
      owner: await this.userService.findOne(createCommentDTO.ownerId),
      message: await this.messagesService.findOne(createCommentDTO.messageId),
    })
  }

  async isOwner(userId: string, commentId: string) {
    return await this.repository.createQueryBuilder('comment')
      .where('comment.id = :commentId', { commentId })
      .leftJoin('comment.owner', 'owner')
      .where('owner.id = :userId', { userId })
      .getCount() > 0
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findOne(id);
  }

  async update(id: string, updateCommentDto: UpdateCommentDTO) {
    const toUpdate = await this.repository.findOne(id);
    if (!toUpdate) {
      throw new NotFoundException(`Comment with id "${id}" not found`);
    }
    return await this.repository.save({
      ...toUpdate,
      ...updateCommentDto,
      owner: toUpdate.owner,
      message: toUpdate.message,
    });
  }

  async remove(id: string) {
    const toDelete = await this.repository.findOne(id);
    if (!toDelete) {
      throw new NotFoundException(`Comment with id "${id}" not found`);
    }
    return await this.repository.remove(toDelete);
  }
}
