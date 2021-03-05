import { OmitType } from '@nestjs/swagger';
import { CreateTopicDto } from './create-topic.dto';

export class UpdateTopicDto extends OmitType(CreateTopicDto, ['categoryId']) { }
