import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateRoleDTO } from './create-role.dto';

export class UpdateRoleDTO extends CreateRoleDTO {
  @ApiProperty({ required: true })
  @IsString()
  id: string;
}