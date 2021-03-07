import { ModelNotFoundError } from 'src/errors/entity-not-found.error';
import { BaseCRUDRepository } from 'src/modules/shared/repositories/base-entity-repository';
import { EntityRepository, getConnection } from 'typeorm';
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

  protected throwNotFoundError(info) {
    throw new ModelNotFoundError('User', info);
  }
  protected fromPartial(entity) {
    return new User(entity);
  }

}
