import { Module } from '@nestjs/common';
import { PermissionController } from './permissions/permission.controller';
import { PermissionsModule } from './permissions/permissions.module';
import { RoleController } from './roles/role.controller';
import { RoleModule } from './roles/role.module';
import { UserController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PermissionsModule, RoleModule, UsersModule],
  controllers: [UserController, PermissionController, RoleController],
  exports: [PermissionsModule, RoleModule, UsersModule],
})
export class AuthModule {}
