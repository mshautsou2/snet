import { SetMetadata } from '@nestjs/common';
import { PermissionsKeys } from 'src/modules/permissions/permissions-keys.constants';

export const REQUIRE_PERMISSIONS_KEY = 'require_permissions_key';
export const RequirePermissions = (...permissions: PermissionsKeys[]) =>
  SetMetadata(REQUIRE_PERMISSIONS_KEY, permissions);
