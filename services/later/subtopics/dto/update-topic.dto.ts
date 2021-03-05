import { OmitType } from '@nestjs/swagger';
import { CreateSubTopicDTO } from './create-sub-topic.dto';

export class UpdateSubTopicDto extends OmitType(CreateSubTopicDTO, ['topicId']) { }
