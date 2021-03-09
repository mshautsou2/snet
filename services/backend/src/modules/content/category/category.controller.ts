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
import { RequirePermissions } from 'decorators/permission.decorator';
import { WithOwner } from 'decorators/with-owner.decorator';
import { PermissionsKeys } from 'modules/auth/permissions/permissions-keys.constants';
import { FindOneParams } from 'modules/shared/dto/find-one.dto';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('categories')
@ApiTags('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Post()
  @WithOwner()
  @RequirePermissions(PermissionsKeys.EditSelfCategory)
  public async create(@Body() body: Category) {
    return await this.service.createEntity(body);
  }

  @Get(':id')
  @RequirePermissions(PermissionsKeys.ViewCategory)
  public async findOne(@Param() params: FindOneParams) {
    return await this.service.findOneEntity(params.id);
  }

  @Get()
  @RequirePermissions(PermissionsKeys.ViewCategory)
  public async findAll() {
    return await this.service.findAllEntities();
  }

  @Put('/:id')
  @WithOwner()
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnyCategory],
    ownEntityPermissions: [PermissionsKeys.EditSelfCategory],
    entityClass: Category,
  })
  async update(@Param('id') entityId: string, @Body() user: Category) {
    return await this.service.update(entityId, user);
  }

  @Delete('/:id')
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnyCategory],
    ownEntityPermissions: [PermissionsKeys.EditSelfCategory],
    entityClass: Category,
  })
  public async delete(@Param('id') entityId: string) {
    return await this.service.removeEntity(entityId);
  }
}
