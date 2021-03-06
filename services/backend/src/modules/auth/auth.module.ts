import { Module } from '@nestjs/common';
import { PermissionsModule } from './permissions/permissions.module';
import { RoleModule } from './roles/role.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PermissionsModule, RoleModule, UsersModule],
  exports: [PermissionsModule, RoleModule, UsersModule],
})
export class AuthModule {}
