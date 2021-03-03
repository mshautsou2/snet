import { OmitType } from '@nestjs/swagger';
import { CreateMessageDTO } from 'src/modules/messages/dto/create-message.dto';

export class UpdateMessageDTO extends OmitType(CreateMessageDTO, ['subtopicId']) { }
