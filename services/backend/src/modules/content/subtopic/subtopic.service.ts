import { Injectable } from '@nestjs/common';
import { BaseCRUDService } from 'modules/shared/services/base-entity-service';
import { Subtopic } from './subtopic.entity';
import { SubtopicRepository } from './subtopic.repository';

@Injectable()
export class SubtopicService extends BaseCRUDService<Subtopic> {
  constructor(protected repository: SubtopicRepository) {
    super();
  }
}
