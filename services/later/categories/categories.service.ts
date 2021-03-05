import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/modules/auth/users/node_modules/src/errors/NotFoundError';
import { CategoryRepository } from 'src/modules/categories/categoires.repository';
import { Category } from 'src/modules/categories/categories.entity';
import { PermissionsKeys } from 'src/modules/permissions/permissions-keys.constants';
import { UsersService } from 'src/modules/auth/users/users.service';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    private userService: UsersService,
    private roleService: RolesService,
  ) {}

  async create(
    createCategoryDto: Category,
    ownerId: string,
  ): Promise<Category> {
    const owner = await this.userService.findOne(ownerId);
    return await this.categoryRepository.save({
      ...createCategoryDto,
      owner,
    });
  }

  async checkCategoryPermission(userId: string, categoryId: string) {
    const isEntityOwner = await this.isOwner(userId, categoryId);
    const perissionToCheck = isEntityOwner
      ? PermissionsKeys.EditSelfCategory
      : PermissionsKeys.EditCategory;
    const accessGranted = await this.roleService.checkPermissions(
      userId,
      perissionToCheck,
    );
    return accessGranted;
  }

  async isOwner(userId: string, categoryId: string) {
    return await this.categoryRepository.isOwner(userId, categoryId);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      this.throwCategoryNotFoundError();
    }
    return category;
  }

  async update(id: string, category: Category) {
    const toUpdate = await this.categoryRepository.findOne(id);
    if (!toUpdate) {
      this.throwCategoryNotFoundError();
    }
    Object.assign(toUpdate, category);
    return await this.categoryRepository.save(toUpdate);
  }

  async remove(id: string) {
    const toDelete = await this.categoryRepository.findOne(id);
    if (!toDelete) {
      this.throwCategoryNotFoundError();
    }
    return await this.categoryRepository.remove(toDelete);
  }

  private throwCategoryNotFoundError() {
    throw new NotFoundError('Category not found');
  }
}
