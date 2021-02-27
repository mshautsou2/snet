import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionsKeys } from 'src/roles-and-permissions/constants/permissions-keys.constants';
import { RequirePermissions } from 'src/roles-and-permissions/decorators/permission.decorator';
import { FindOneParams } from 'src/shared/dto/find-one.dto';
import { ExtractUser } from 'src/users/user.decorator';
import { User } from 'src/users/user.entity';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@ApiTags('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @RequirePermissions(() => [PermissionsKeys.EditCategory])
  create(@ExtractUser() user: User,@Body() createCategoryDto: CreateCategoryDto) {
    console.log('user', user)
    createCategoryDto.authorId = user.id;
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @RequirePermissions(() => [PermissionsKeys.ViewCategory])
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @RequirePermissions(() => [PermissionsKeys.ViewCategory])
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @RequirePermissions(() => [PermissionsKeys.EditCategory])
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @RequirePermissions(() => [PermissionsKeys.EditCategory])
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
