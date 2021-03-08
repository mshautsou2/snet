import { ModelNotFoundError } from 'errors/entity-not-found.error';
import { BaseCRUDRepository } from 'modules/shared/repositories/base-entity-repository';
import { EntityRepository } from 'typeorm';
import { Topic } from './topic.entity';

@EntityRepository(Topic)
export class TopicRepository extends BaseCRUDRepository<Topic> {
  async findById(id: string) {
    return await this.findOne(id, {
      join: {
        alias: 'topic',
        leftJoinAndSelect: {
          topics: 'topic.subtopics',
        },
      },
    });
  }

  protected throwNotFoundError(info) {
    throw new ModelNotFoundError('Topic', info);
  }
  protected fromPartial(entity) {
    return new Topic(entity);
  }
}
