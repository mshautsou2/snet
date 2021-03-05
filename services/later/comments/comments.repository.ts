import { EntityRepository, Repository } from "typeorm";
import { Comment } from 'src/modules/comments/comment.entity'

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
    
  async isOwner(userId: string, commentId: string) {
    return await this.createQueryBuilder('comment')
      .where('comment.id = :commentId', { commentId })
      .leftJoin('comment.owner', 'owner')
      .where('owner.id = :userId', { userId })
      .getCount() > 0
  }

}
