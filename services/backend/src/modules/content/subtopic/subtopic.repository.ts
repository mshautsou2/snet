import { ModelNotFoundError } from 'errors/entity-not-found.error';
import { BaseCRUDRepository } from 'modules/shared/repositories/base-entity-repository';
import { EntityRepository } from 'typeorm';
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

  protected throwNotFoundError(info: any) {
    throw new ModelNotFoundError('Subtopic', info);
  }
  protected fromPartial(entity: any) {
    return new Subtopic(entity);
  }
}
