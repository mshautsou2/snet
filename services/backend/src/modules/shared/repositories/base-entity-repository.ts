import { FindOneOptions, Repository } from 'typeorm';
import { BaseEntity } from '../entitiy/base.entity';

export abstract class BaseCRUDRepository<
  T extends BaseEntity
> extends Repository<T> {
  abstract throwNotFoundError(identificationInfo: any): void;

  async findEntityByCondition(options?: FindOneOptions<T>): Promise<T> {
    const result = await this.findOne(options);
    if (!result) {
      this.throwNotFoundError(options);
    }
    return result;
  }
  async findEntity(id: string): Promise<T> {
    const result = await this.findOne(id);
    if (!result) {
      this.throwNotFoundError(id);
    }
    return result;
  }
  async updateEntity(id: string, body: T) {
    const result = await this.update(id, body as any);
    if (result.affected === 0) {
      this.throwNotFoundError(id);
    }
    return await this.findEntity(id);
  }

  async removeEntity(id: string): Promise<void> {
    const toDelete = await this.delete(id);
    if (toDelete.affected === 0) {
      this.throwNotFoundError(id);
    }
  }
}
