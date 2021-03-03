import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePermissionDTO implements Readonly<CreatePermissionDTO> {
  @ApiProperty({ required: true })
  @IsString()
  title: string;

  @ApiProperty({ required: true })
  @IsString()
  key: string;

  @ApiProperty({ required: false })
  @IsString()
  description: string;
}