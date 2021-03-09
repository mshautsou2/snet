import { ModelNotFoundError } from 'errors/entity-not-found.error';
import { BaseCRUDRepository } from 'modules/shared/repositories/base-entity-repository';
import { EntityRepository, getConnection } from 'typeorm';
import { Message } from '../messages/message.entity';
import { Subtopic } from './subtopic.entity';

@EntityRepository(Subtopic)
export class SubtopicRepository extends BaseCRUDRepository<Subtopic> {
  async findEntity(id: string) {
    const result = await this.findOne(id, {
      join: {
        alias: 'subtopic',
        leftJoinAndSelect: {
          messages: 'subtopic.messages',
        },
      },
    });
    if (!result) {
      this.throwNotFoundError(id);
    }
    return this.fromPartial(result);
  }

  async findMessagesAndComments(
    subtopicId: string,
    limit: number,
  ): Promise<Message[]> {
    return await getConnection()
      .getRepository(Message)
      .createQueryBuilder('message')
      .where('message.subtopic.id = :subtopicId', { subtopicId })
      .leftJoinAndSelect('message.comments', 'comment')
      .addOrderBy('message.timestamp', 'DESC')
      .limit(limit)
      .getMany();
  }
  protected throwNotFoundError(info: any) {
    throw new ModelNotFoundError('Subtopic', info);
  }
  protected fromPartial(entity: any) {
    return new Subtopic(entity);
  }
}
