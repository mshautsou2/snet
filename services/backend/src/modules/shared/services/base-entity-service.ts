import { FindOneOptions } from 'typeorm';
import { BaseEntity } from '../entitiy/base.entity';
import { BaseCRUDRepository } from '../repositories/base-entity-repository';

export abstract class BaseCRUDService<T extends BaseEntity> {
  protected abstract repository: BaseCRUDRepository<T>;

  async createEntity(permission: T): Promise<T> {
    this.beforeCreate(permission);
    return await this.repository.save(permission as any);
  }

  findAllEntities(): Promise<T[]> {
    return this.repository.find();
  }

  findOneEntity(id: string): Promise<T> {
    return this.repository.findOne(id);
  }

  findByConditions(options: FindOneOptions<T>): Promise<T> {
    this.repository.findEntityByCondition(options);
    return this.repository.findOne(options);
  }

  async update(id: string, body: T): Promise<T> {
    this.beforeUpdate(body);
    return await this.repository.updateEntity(id, body);
  }

  async removeEntity(id: string): Promise<void> {
    return await this.removeEntity(id);
  }

  protected async beforeCreate(entity: T) {
    return;
  }

  protected async beforeUpdate(entity: T) {
    return;
  }
}
