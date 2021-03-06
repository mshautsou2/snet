import { SetMetadata } from '@nestjs/common';
import { PermissionsKeys } from '../modules/auth/permissions/permissions-keys.constants';

export const REQUIRE_PERMISSIONS_KEY = 'general_require_permissions_key';

type SinglePermissionConfig = PermissionsKeys;

type MultiPermissionConfig = PermissionsKeys[];

interface CustomPolicyConfig {
  anyEntityPermissions: PermissionsKeys[];
  ownEntityPermissions: PermissionsKeys[];
  entityName: string;
}

export type PermissionConfig =
  | SinglePermissionConfig
  | MultiPermissionConfig
  | CustomPolicyConfig;

export const isSinglePermissionConfig = (
  config: PermissionConfig,
): config is SinglePermissionConfig => {
  return typeof config === 'string';
};

export const isMultiPermissionConfig = (
  config: PermissionConfig,
): config is MultiPermissionConfig => {
  return Array.isArray(config);
};

export const isCustomPolictyConfig = (
  config: PermissionConfig,
): config is CustomPolicyConfig => {
  return 'anyEntityPermissions' in (config as CustomPolicyConfig);
};
export const RequirePermissions = (config: PermissionConfig) =>
  SetMetadata(REQUIRE_PERMISSIONS_KEY, config);
