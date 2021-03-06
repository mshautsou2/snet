import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/modules/auth/users/user.entity';
import {
  isSinglePermissionConfig,
  PermissionConfig,
  REQUIRE_PERMISSIONS_KEY
} from '../decorators/permission.decorator';
import { RolesService } from '../modules/auth/roles/roles.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rolesService: RolesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    const permissionConfig = this.reflector.getAllAndOverride<PermissionConfig>(
      REQUIRE_PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!permissionConfig) {
      return true;
    }
    if (isSinglePermissionConfig(permissionConfig)) {
      return await this.
    }

    const accessGranted = this.rolesService.checkPermissions(
      user.id,
      ...requiredPermissions,
    );
    return accessGranted;
  }
}
