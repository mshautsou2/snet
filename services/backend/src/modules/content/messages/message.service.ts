import { Injectable } from '@nestjs/common';
import { BaseCRUDService } from 'modules/shared/services/base-entity-service';
import { Message } from './message.entity';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService extends BaseCRUDService<Message> {
  constructor(protected repository: MessageRepository) {
    super();
  }
}
