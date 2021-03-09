import { Injectable } from '@nestjs/common';
import { BaseCRUDService } from 'modules/shared/services/base-entity-service';
import { Message } from '../messages/message.entity';
import { Subtopic } from './subtopic.entity';
import { SubtopicRepository } from './subtopic.repository';

@Injectable()
export class SubtopicService extends BaseCRUDService<Subtopic> {
  constructor(protected repository: SubtopicRepository) {
    super();
  }

  async findMessagesAndComments(
    subtopicId: string,
    limit: number,
  ): Promise<Message[]> {
    return this.repository.findMessagesAndComments(subtopicId, limit);
  }
}
