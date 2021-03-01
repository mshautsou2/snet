import { Injectable } from '@nestjs/common';
import { PermissionsKeys } from 'src/roles-and-permissions/constants/permissions-keys.constants';
import { RolesAndPermissionsService } from 'src/roles-and-permissions/services/roles-and-permissions.service';
import { UsersService } from 'src/users/users.service';
import { CategoryRepository } from './categoires.repository';
import { Category } from './entities/categories.entity';

@Injectable()
export class CategoryService {

  constructor(
    private categoryRepository: CategoryRepository,
    private userService: UsersService,
    private rolesPermissionService: RolesAndPermissionsService,
  ) { }

  async create(createCategoryDto: Category, ownerId: string) {
    return await this.categoryRepository.save({
      ...createCategoryDto,
      owner: await this.userService.findOne(ownerId)
    })
  }

  async checkCategoryPermission(userId: string, categoryId: string) {
    const isEntityOwner = await this.isOwner(userId, categoryId);
    const perissionToCheck = isEntityOwner ? PermissionsKeys.EditSelfCategory : PermissionsKeys.EditCategory
    const accessGranted = await this.rolesPermissionService.checkPermissions(userId, perissionToCheck);
    return accessGranted;
  }

  async isOwner(userId: string, categoryId: string) {
    return await this.categoryRepository.isOwner(userId, categoryId);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: string) {
    return await this.categoryRepository.findById(id);
  }

  async update(id: string, category: Category) {
    const toUpdate = await this.categoryRepository.findOne(id);
    if (!toUpdate) {
      return null;
    }
    Object.assign(toUpdate, category);
    return await this.categoryRepository.save(toUpdate);
  }

  async remove(id: string) {
    const toDelete = await this.categoryRepository.findOne(id);
    if (!toDelete) {
      return null
    }
    return await this.categoryRepository.remove(toDelete);
  }
}
