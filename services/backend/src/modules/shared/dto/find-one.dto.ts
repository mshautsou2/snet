import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindOneParams {
  @IsUUID()
  @ApiProperty()
  id: string;
}
