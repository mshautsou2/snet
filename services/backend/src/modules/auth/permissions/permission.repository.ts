import { EntityNotFoundError } from 'src/errors/entity-not-found.error';
import { BaseCRUDRepository } from 'src/modules/shared/repositories/base-entity-repository';
import { EntityRepository } from 'typeorm';
import { Permission } from './permission.entity';

@EntityRepository(Permission)
export class PermissionRepository extends BaseCRUDRepository<Permission> {
  async isOwner(entityName: string, resourceId: string, userId: string) {
    return (
      (await this.createQueryBuilder(entityName)
        .where(`${entityName}.id = :subtopicId`, { id: resourceId })
        .leftJoin(`${entityName}.owner`, 'owner')
        .where('owner.id = :userId', { userId })
        .getCount()) > 0
    );
  }

  throwNotFoundError(info) {
    throw new EntityNotFoundError('Permission', info);
  }
}
