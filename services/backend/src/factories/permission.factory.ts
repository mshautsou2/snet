import Faker from 'faker';
import { Permission } from 'modules/auth/permissions/permission.entity';
import { define } from 'typeorm-seeding';

define(Permission, (faker: typeof Faker) => {
  const permission = new Permission({
    key: faker.random.word(),
    title: faker.random.words(),
  });
  return permission;
});
