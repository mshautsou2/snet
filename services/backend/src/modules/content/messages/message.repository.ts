import { ModelNotFoundError } from 'errors/entity-not-found.error';
import { BaseCRUDRepository } from 'modules/shared/repositories/base-entity-repository';
import { EntityRepository } from 'typeorm';
import { Message } from './message.entity';

@EntityRepository(Message)
export class MessageRepository extends BaseCRUDRepository<Message> {
  async findById(id: string) {
    return await this.findOne(id, {
      join: {
        alias: 'message',
        leftJoinAndSelect: {
          comments: 'message.comments',
        },
      },
    });
  }

  protected throwNotFoundError(info) {
    throw new ModelNotFoundError('Message', info);
  }
  protected fromPartial(entity) {
    return new Message(entity);
  }
}
