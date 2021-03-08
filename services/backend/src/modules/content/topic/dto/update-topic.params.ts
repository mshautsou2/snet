import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateTopicParams } from './create-topic.params';

export class UpdateTopicParams extends CreateTopicParams {
  @IsUUID()
  @ApiProperty()
  id: string;
}
