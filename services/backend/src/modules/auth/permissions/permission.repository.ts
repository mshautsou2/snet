import { EntityNotFoundError } from 'src/errors/entity-not-found.error';
import { BaseCRUDRepository } from 'src/modules/shared/repositories/base-entity-repository';
import { EntityRepository } from 'typeorm';
import { Permission } from './permission.entity';

@EntityRepository(Permission)
export class PermissionRepository extends BaseCRUDRepository<Permission> {
  throwNotFoundError(info) {
    throw new EntityNotFoundError('Permission', info);
  }
}
