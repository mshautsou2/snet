import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindOneParams } from 'modules/shared/dto/find-one.dto';
import { RequirePermissions } from '../../../decorators/permission.decorator';
import { PermissionsKeys } from '../permissions/permissions-keys.constants';
import { Role } from './role.entity';
import { RolesService } from './roles.service';

@Controller('roles')
@ApiTags('roles')
export class RoleController {
  constructor(private roleService: RolesService) {}

  @Post()
  @RequirePermissions(PermissionsKeys.EditRoles)
  public async create(@Body() body: Role) {
    return await this.roleService.createEntity(body);
  }

  @Get(':id')
  @RequirePermissions(PermissionsKeys.ViewRoles)
  public async findOne(@Param() params: FindOneParams) {
    return await this.roleService.findOneEntity(params.id);
  }

  @Get()
  @RequirePermissions(PermissionsKeys.ViewRoles)
  public async findAll() {
    return await this.roleService.findAllEntities();
  }

  @Put('/:id')
  @RequirePermissions(PermissionsKeys.EditRoles)
  async update(@Param('id') roleId: string, @Body() role: Role) {
    return await this.roleService.update(roleId, role);
  }

  @Delete('/:id')
  @RequirePermissions(PermissionsKeys.EditRoles)
  public async delete(@Param() params: { id: string }) {
    return await this.roleService.removeEntity(params.id);
  }
}
