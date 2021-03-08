import { ModelNotFoundError } from 'errors/entity-not-found.error';
import { Category } from 'modules/content/category/category.entity';
import { BaseCRUDRepository } from 'modules/shared/repositories/base-entity-repository';
import { EntityRepository } from 'typeorm';

@EntityRepository(Category)
export class CategoryRepository extends BaseCRUDRepository<Category> {
  async findEntity(id: string): Promise<Category> {
    const result = await this.findOne(id, {
      join: {
        alias: 'category',
        leftJoinAndSelect: {
          topcis: 'category.topics',
        },
      },
    });
    if (!result) {
      this.throwNotFoundError(id);
    }
    return this.fromPartial(result);
  }

  protected throwNotFoundError(info) {
    throw new ModelNotFoundError('Category', info);
  }
  protected fromPartial(entity) {
    return new Category(entity);
  }
}
