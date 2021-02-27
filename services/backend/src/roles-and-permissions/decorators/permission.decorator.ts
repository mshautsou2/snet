import { PermissionsKeys } from '../constants/permissions-keys.constants';
import { SetMetadata } from '@nestjs/common';

export const REQUIRE_PERMISSIONS_KEY = 'require_permissions_key';
export const RequirePermissions = (...permissions: PermissionsKeys[]) =>
  SetMetadata(REQUIRE_PERMISSIONS_KEY, permissions);
