import { Role } from 'modules/auth/roles/role.entity';
import { returnRole, returnUser, User } from '../user.entity';

describe('UserEntity', () => {
  describe('userRoles', () => {
    it('should return an array of users', async () => {
      const user = new User({});
      expect(user.owner).toBe(undefined);
      expect(user.roles).toBe(undefined);
      expect(returnRole()).toBe(Role);
      expect(returnUser()).toBe(User);
    });
  });
});
