import { Injectable } from '@nestjs/common';
import { BaseCRUDService } from 'modules/shared/services/base-entity-service';
import { Topic } from './topic.entity';
import { TopicRepository } from './topic.repository';

@Injectable()
export class TopicService extends BaseCRUDService<Topic> {
  constructor(protected repository: TopicRepository) {
    super();
  }
}
