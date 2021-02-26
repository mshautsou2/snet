import { UsersPermissionsKeys } from '../constants/user-permissions-keys.constants';
import { SetMetadata } from '@nestjs/common';

export const REQUIRE_PERMISSIONS_KEY = 'require_permissions_key';
export const RequirePermissions = (...permissions: UsersPermissionsKeys[]) =>
  SetMetadata(REQUIRE_PERMISSIONS_KEY, permissions);
