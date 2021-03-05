import { BaseCRUDRepository } from 'src/modules/shared/repositories/base-entity-repository';
import { EntityNotFoundError, EntityRepository, getConnection } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends BaseCRUDRepository<User> {
  async addRole(userId: string, roleId: string) {
    await getConnection()
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(userId)
      .add(roleId);
  }

  throwNotFoundError(info) {
    throw new EntityNotFoundError('User', info);
  }
}
