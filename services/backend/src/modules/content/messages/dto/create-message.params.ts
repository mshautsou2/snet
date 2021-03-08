import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateMessageParams {
  @IsUUID()
  @ApiProperty()
  subtopicId: string;
}
