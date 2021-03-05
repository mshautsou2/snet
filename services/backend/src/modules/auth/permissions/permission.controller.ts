import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindOneParams } from 'src/modules/shared/dto/find-one.dto';
import { RequirePermissions } from '../../../decorators/permission.decorator';
import { PermissionService } from './permission.service';
import { PermissionsKeys } from './permissions-keys.constants';

@Controller('permissions')
@ApiTags('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  // @Post()
  // @RequirePermissions(PermissionsKeys.EditPermissions)
  // public async create(@Body() body: Permission) {
  //   return await this.permissionService.create(body);
  // }

  @Get(':id')
  @RequirePermissions(PermissionsKeys.ViewPermissions)
  public async findOne(@Param() params: FindOneParams) {
    return await this.permissionService.findOneEntity(params.id);
  }

  @Get()
  @RequirePermissions(PermissionsKeys.ViewPermissions)
  public async findAll() {
    return await this.permissionService.findAllEntities();
  }

  // @Put('/:id')
  // @RequirePermissions(PermissionsKeys.EditPermissions)
  // async update(
  //   @Param('id') permissionId: string,
  //   @Body() permission: Permission,
  // ) {
  //   return await this.permissionService.update(permissionId, permission);
  // }

  // @Delete('/:id')
  // @RequirePermissions(PermissionsKeys.EditPermissions)
  // public async delete(@Param() params: { id: string }) {
  //   return await this.permissionService.remove(params.id);
  // }
}
