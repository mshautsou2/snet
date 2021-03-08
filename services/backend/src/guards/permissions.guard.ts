import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionService } from 'modules/auth/permissions/permission.service';
import { User } from 'modules/auth/users/user.entity';
import {
  isCustomPolictyConfig,
  isMultiPermissionConfig,
  isSinglePermissionConfig,
  PermissionConfig,
  REQUIRE_PERMISSIONS_DECORATOR_KEY,
} from '../decorators/permission.decorator';
import { RolesService } from '../modules/auth/roles/roles.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rolesService: RolesService,
    private permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    const permissionConfig = this.reflector.getAllAndOverride<PermissionConfig>(
      REQUIRE_PERMISSIONS_DECORATOR_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!permissionConfig) {
      return true;
    }
    if (!user.id) {
      return false;
    }
    if (isSinglePermissionConfig(permissionConfig)) {
      return await this.rolesService.hasPermissions(user.id, permissionConfig);
    }
    if (isMultiPermissionConfig(permissionConfig)) {
      return await this.rolesService.hasPermissions(
        user.id,
        ...permissionConfig,
      );
    }
    if (isCustomPolictyConfig(permissionConfig)) {
      const resourceId = request.params?.id;
      const {
        entityClass,
        anyEntityPermissions,
        ownEntityPermissions,
      } = permissionConfig;
      const isOwner =
        resourceId &&
        (await this.permissionService.isOwner(
          entityClass,
          resourceId,
          user.id,
        ));

      if (isOwner) {
        return await this.rolesService.hasPermissions(
          user.id,
          ...ownEntityPermissions,
        );
      } else {
        return await this.rolesService.hasPermissions(
          user.id,
          ...anyEntityPermissions,
        );
      }
    }
    return false;
  }
}
