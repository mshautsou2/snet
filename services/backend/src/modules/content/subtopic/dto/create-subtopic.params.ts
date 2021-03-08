import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateSubtopicParams {
  @IsUUID()
  @ApiProperty()
  topicId: string;
}
