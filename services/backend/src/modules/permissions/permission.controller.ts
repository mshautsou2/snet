import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePermissionDTO } from 'src/modules/permissions/dto/create-permission.dto';
import { FindOneParams } from 'src/modules/shared/dto/find-one.dto';
import { UpdatePermissionDTO } from 'src/modules/permissions/dto/update-permission.dto';
import { PermissionService } from 'src/modules/permissions/permission.service';
import { DeleteOneParams } from '../shared/dto/delete-one.dto';

@Controller('permissions')
@ApiTags('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) { }

  @Post()
  public create(@Body() dto: CreatePermissionDTO) {
    return this.permissionService.create(dto);
  }

  @Get(':id')
  public async getById(@Param() params: FindOneParams) {
    return await this.permissionService.findOne(params.id);
  }

  @Get()
  public async getAll() {
    return await this.permissionService.findAll();
  }

  @Put('/:id')
  async update(
    @Param('id') permissionId: string,
    @Body() permissionDto: UpdatePermissionDTO,
  ) {
    return await this.permissionService.update(permissionId, permissionDto);
  }

  @Delete('/:id')
  public async delete(@Param() params: DeleteOneParams) {
    return await this.permissionService.remove(params.id);
  }
}
