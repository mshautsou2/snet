import { Injectable } from '@nestjs/common';
import { BaseCRUDService } from 'modules/shared/services/base-entity-service';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService extends BaseCRUDService<Category> {
  constructor(protected repository: CategoryRepository) {
    super();
  }
}
