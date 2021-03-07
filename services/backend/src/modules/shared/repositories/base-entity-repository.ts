import { FindOneOptions, Repository } from 'typeorm';
import { BaseEntity } from '../entitiy/base.entity';

export abstract class BaseCRUDRepository<
  T extends BaseEntity
> extends Repository<T> {
  protected abstract throwNotFoundError(identificationInfo: any): void;
  protected abstract fromPartial(partial: Partial<T>): T;

  async saveEntity(entity: T): Promise<T> {
    const saveResult = await this.save(entity as any);
    return this.fromPartial(saveResult as any);
  }

  async findEntityByProperties(properties: { [property: string]: string }) {
    const result = await this.findOne({
      where: properties,
    });
    if (!result) {
      this.throwNotFoundError(
        Object.entries(properties)
          .map(([key, value]) => `${key}: ${value}`)
          .join(),
      );
    }
    return this.fromPartial(result);
  }

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
    return this.fromPartial(result);
  }

  async findAllEntities(): Promise<T[]> {
    const result = await this.find();
    return result.map((r) => this.fromPartial(r));
  }

  async updateEntity(id: string, body: Partial<T>) {
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
