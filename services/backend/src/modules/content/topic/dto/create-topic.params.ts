import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateTopicParams {
  @IsUUID()
  @ApiProperty()
  categoryId: string;
}
