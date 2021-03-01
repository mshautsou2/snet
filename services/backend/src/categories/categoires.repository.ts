import { EntityRepository, Repository } from "typeorm";
import { Category } from "./entities/categories.entity";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
    
  async isOwner(userId: string, categoryId: string) {
    return await this.createQueryBuilder('category')
      .where('category.id = :categoryId', { categoryId })
      .leftJoin('category.owner', 'owner')
      .where('owner.id = :userId', { userId })
      .getCount() > 0
  }

  async findById(id: string) {
    return await this.findOne(id, {
        join: {
          alias: 'categories',
          leftJoinAndSelect: {
            topcis: 'categories.topics',
          },
  
        }
      });
  }

}
