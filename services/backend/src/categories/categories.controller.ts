import { Controller, Get, Post, Body, Put, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionsKeys } from 'src/roles-and-permissions/constants/permissions-keys.constants';
import { RequirePermissions } from 'src/roles-and-permissions/decorators/permission.decorator';
import { UserPayload } from 'src/roles-and-permissions/models/user.payload';
import { PermissionService } from 'src/roles-and-permissions/services/permission.service';
import { RolesAndPermissionsService } from 'src/roles-and-permissions/services/roles-and-permissions.service';
import { FindOneParams } from 'src/shared/dto/find-one.dto';
import { ExtractUser } from 'src/users/user.decorator';
import { User } from 'src/users/user.entity';
import { CategoryService as CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService, private readonly rolesPermissionService: RolesAndPermissionsService) {}

  @Post()
  async create(@ExtractUser() user: UserPayload,@Body() createCategoryDto: CreateCategoryDto) {
    const accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditCategory);
    if (accessGranted) {
      throw new UnauthorizedException("You do not have permissions to create categories");
    }
    createCategoryDto.owner = user.id;
    return this.categoriesService.create(createCategoryDto);
  }


  @Get()
  @RequirePermissions(PermissionsKeys.ViewCategory)
  findAll(@ExtractUser() user) {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @RequirePermissions(PermissionsKeys.ViewCategory)
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  async update(@ExtractUser() user: UserPayload, @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {

    let accessGranted = false;

    const entityOwner = await this.categoriesService.isOwner(user.id, id);

    if (entityOwner) {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditSelfCategory);
    } else {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditCategory);
    }
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to edit this category");
    }
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @ExtractUser() user: UserPayload) {

    let accessGranted = false;

    const entityOwner = await this.categoriesService.isOwner(user.id, id);

    if (entityOwner) {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditSelfCategory);
    } else {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditSelfCategory);
    }
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to delete this category");
    }
    return this.categoriesService.remove(id);
  }
}
