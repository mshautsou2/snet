import { PermissionsKeys } from '../constants/permissions-keys.constants';
import { SetMetadata } from '@nestjs/common';

export const REQUIRE_PERMISSIONS_KEY = 'require_permissions_key';
export const RequirePermissions = (permissionsFunction: (isOwner: boolean) => PermissionsKeys[] ) =>
  SetMetadata(REQUIRE_PERMISSIONS_KEY, permissionsFunction);
