import { ModelNotFoundError } from 'errors/entity-not-found.error';
import { BaseCRUDRepository } from 'modules/shared/repositories/base-entity-repository';
import { EntityRepository } from 'typeorm';
import { Comment } from './comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends BaseCRUDRepository<Comment> {
  protected throwNotFoundError(info) {
    throw new ModelNotFoundError('Comment', info);
  }
  protected fromPartial(entity) {
    return new Comment(entity);
  }
}
