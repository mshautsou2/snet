import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionsKeys } from 'src/modules/permissions/permissions-keys.constants';
import { RequirePermissions } from 'src/modules/permissions/permission.decorator';
import { UserPayload } from 'src/modules/permissions/user.payload';
import { ExtractUser } from 'src/modules/users/user.decorator';
import { CategoryService as CategoriesService } from './categories.service';
import { Category } from 'src/modules/categories/categories.entity';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  async create(@ExtractUser() user: UserPayload, @Body() category: Category) {
    await this.failIfUnauthorized(user.id, category.id);
    return await this.categoriesService.create(category, user.id);
  }

  @Get()
  @RequirePermissions(PermissionsKeys.ViewCategory)
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  @RequirePermissions(PermissionsKeys.ViewCategory)
  async findOne(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(id);
    this.failIfNotExists(category);
    return category;
  }

  @Put(':id')
  async update(@ExtractUser() user: UserPayload, @Param('id') id: string, @Body() category: Category) {
    await this.failIfUnauthorized(user.id, id);
    const updatedEntity = await this.categoriesService.update(id, category);
    this.failIfNotExists(updatedEntity)

  }

  @Delete(':id')
  async remove(@Param('id') id: string, @ExtractUser() user: UserPayload) {
    await this.failIfUnauthorized(user.id, id);
    const removedCategory = await this.categoriesService.remove(id);
    this.failIfNotExists(removedCategory)
  }

  private async failIfUnauthorized(userId: string, categoryId: string) {
    const accessGranted = await this.categoriesService.checkCategoryPermission(userId, categoryId)
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have enough permissions")
    }
  }

  private async failIfNotExists(category: Category | null) {
    if (!category) {
      throw new NotFoundException("Category not found")
    }
  }

}
