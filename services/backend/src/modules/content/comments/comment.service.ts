import { Injectable } from '@nestjs/common';
import { BaseCRUDService } from 'modules/shared/services/base-entity-service';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService extends BaseCRUDService<Comment> {
  constructor(protected repository: CommentRepository) {
    super();
  }
}
