import { FindOneOptions } from 'typeorm';
import { BaseEntity } from '../entitiy/base.entity';
import { BaseCRUDRepository } from '../repositories/base-entity-repository';

export abstract class BaseCRUDService<T extends BaseEntity> {
  protected abstract repository: BaseCRUDRepository<T>;

  async createEntity(entity: T): Promise<T> {
    await this.beforeCreate(entity);
    return await this.repository.saveEntity(entity as any);
  }

  findAllEntities(): Promise<T[]> {
    return this.repository.findAllEntities();
  }

  findOneEntity(id: string): Promise<T> {
    return this.repository.findEntity(id);
  }

  findByConditions(options: FindOneOptions<T>): Promise<T> {
    this.repository.findEntityByCondition(options);
    return this.repository.findOne(options);
  }

  async update(id: string, body: Partial<T>): Promise<T> {
    this.beforeUpdate(body);
    return await this.repository.updateEntity(id, body);
  }

  async removeEntity(id: string): Promise<void> {
    return await this.repository.removeEntity(id);
  }

  protected async beforeCreate(entity: T) {
    return;
  }

  protected async beforeUpdate(entity: Partial<T>) {
    return;
  }
}
