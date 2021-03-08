import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateSubtopicParams } from './create-subtopic.params';

export class UpdateTopicParams extends CreateSubtopicParams {
  @IsUUID()
  @ApiProperty()
  id: string;
}
