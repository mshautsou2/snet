import { EntityNotFoundError } from 'src/errors/entity-not-found.error';
import { BaseCRUDRepository } from 'src/modules/shared/repositories/base-entity-repository';
import { EntityRepository, getConnection } from 'typeorm';
import { PermissionsKeys } from '../permissions/permissions-keys.constants';
import { User } from '../users/user.entity';
import { Role } from './role.entity';
import { RolesKeys } from './roles-keys.constants';

@EntityRepository(Role)
export class RoleRepository extends BaseCRUDRepository<Role> {
  async addPermissionAssociation(roleId: string, permissionId: string) {
    await getConnection()
      .createQueryBuilder()
      .relation(Role, 'permissions')
      .of(roleId)
      .add(permissionId);
  }

  async hasPermissions(userId: string, ...permissions: PermissionsKeys[]) {
    const result =
      (await getConnection()
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :userId', { userId })
        .leftJoin('user.roles', 'role')
        .leftJoin('role.permissions', 'permission')
        .andWhere('permission.key IN (:...permissions)', { permissions })
        .select('TOP 1')
        .getCount()) > 0;
    return result;
  }

  async findByKey(key: RolesKeys): Promise<Role> {
    const result = await this.findOne({
      where: {
        key,
      },
    });
    if (!result) {
      this.throwNotFoundError(key);
    }
    return result;
  }

  throwNotFoundError(info) {
    throw new EntityNotFoundError('Role', info);
  }
}
