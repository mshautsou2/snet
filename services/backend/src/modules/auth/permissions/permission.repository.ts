import { ModelNotFoundError } from 'errors/entity-not-found.error';
import { BaseCRUDRepository } from 'modules/shared/repositories/base-entity-repository';
import { ClassType } from 'modules/shared/types/class.type';
import { EntityRepository, getRepository } from 'typeorm';
import { Permission } from './permission.entity';

@EntityRepository(Permission)
export class PermissionRepository extends BaseCRUDRepository<Permission> {
  /*
    to get all permissions of users
    SELECT u.username, r.key, p.key  FROM "user" u
    LEFT JOIN "user_roles" ur ON ur.user_id = u.id
    LEFT JOIN "role" r ON ur.role_id = r.id
    LEFT JOIN "role_permissions" rpp ON rpp.role_id = r.id
    LEFT JOIN "permission" p ON p.id = rpp.permission_id
    WHERE u.username = 'root';
  */
  async isOwner(entityClass: ClassType, resourceId: string, userId: string) {
    const className = entityClass.name.toLowerCase();
    return (
      (await getRepository(entityClass)
        .createQueryBuilder(className)
        .where(`${className}.id = :resourceId`, { resourceId })
        .leftJoin(`${className}.owner`, 'owner')
        .andWhere('owner.id = :userId', { userId })
        .getCount()) > 0
    );
  }

  protected throwNotFoundError(info) {
    throw new ModelNotFoundError('Permission', info);
  }
  protected fromPartial(partial) {
    return new Permission(partial);
  }
}
