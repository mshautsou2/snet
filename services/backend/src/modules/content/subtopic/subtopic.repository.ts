import { ModelNotFoundError } from 'errors/entity-not-found.error';
import { BaseCRUDRepository } from 'modules/shared/repositories/base-entity-repository';
import { EntityRepository } from 'typeorm';
import { Subtopic } from './subtopic.entity';

@EntityRepository(Subtopic)
export class SubtopicRepository extends BaseCRUDRepository<Subtopic> {
  async findById(id: string) {
    return await this.findOne(id, {
      join: {
        alias: 'subtopic',
        leftJoinAndSelect: {
          messages: 'subtopic.messages',
        },
      },
    });
  }

  protected throwNotFoundError(info: any) {
    throw new ModelNotFoundError('Subtopic', info);
  }
  protected fromPartial(entity: any) {
    return new Subtopic(entity);
  }
}
