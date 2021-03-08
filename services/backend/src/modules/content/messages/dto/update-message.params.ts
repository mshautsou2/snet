import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateMessageParams } from './create-message.params';

export class UpdateMessageParams extends CreateMessageParams {
  @IsUUID()
  @ApiProperty()
  id: string;
}
