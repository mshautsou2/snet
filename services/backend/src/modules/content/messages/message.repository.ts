import { ModelNotFoundError } from 'errors/entity-not-found.error';
import { BaseCRUDRepository } from 'modules/shared/repositories/base-entity-repository';
import { EntityRepository } from 'typeorm';
import { Message } from './message.entity';

@EntityRepository(Message)
export class MessageRepository extends BaseCRUDRepository<Message> {
  async findEntity(id: string) {
    const result = await this.findOne(id, {
      join: {
        alias: 'message',
        leftJoinAndSelect: {
          comments: 'message.comments',
        },
      },
    });
    if (!result) {
      this.throwNotFoundError(id);
    }
    return this.fromPartial(result);
  }

  protected throwNotFoundError(info) {
    throw new ModelNotFoundError('Message', info);
  }
  protected fromPartial(entity) {
    return new Message(entity);
  }
}
