import { SetMetadata } from '@nestjs/common';
import { PermissionsKeys } from '../modules/auth/permissions/permissions-keys.constants';

export const REQUIRE_PERMISSIONS_KEY = 'general_require_permissions_key';

export type SinglePermissionConfig = PermissionsKeys;

export type GeneralPermissionConfig = PermissionsKeys[];

export interface CustomPolicy {
  anyEntityPermissions: PermissionsKeys[];
  ownEntityPermissions: PermissionsKeys[];
  entityName: string;
}

export const RequirePermissions = (
  config: SinglePermissionConfig | GeneralPermissionConfig | CustomPolicy,
) => SetMetadata(REQUIRE_PERMISSIONS_KEY, config);
