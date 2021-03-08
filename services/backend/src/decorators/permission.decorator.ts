import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ClassType } from 'modules/shared/types/class.type';
import { PermissionsKeys } from '../modules/auth/permissions/permissions-keys.constants';

export const REQUIRE_PERMISSIONS_DECORATOR_KEY =
  'general_require_permissions_decorator_key';

type SinglePermissionConfig = PermissionsKeys;

type MultiPermissionConfig = PermissionsKeys[];

interface CustomPolicyConfig {
  anyEntityPermissions: PermissionsKeys[];
  ownEntityPermissions: PermissionsKeys[];
  entityClass: ClassType;
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
  applyDecorators(
    SetMetadata(REQUIRE_PERMISSIONS_DECORATOR_KEY, config),
    ApiBearerAuth(),
  );
