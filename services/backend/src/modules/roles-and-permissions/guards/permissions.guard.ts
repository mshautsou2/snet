import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/modules/users/user.entity';
import { PermissionsKeys } from '../constants/permissions-keys.constants';
import { REQUIRE_PERMISSIONS_KEY } from '../decorators/permission.decorator';
import { RolesAndPermissionsService } from '../services/roles-and-permissions.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private rolesAndPermissionsService: RolesAndPermissionsService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    const requiredPermissions = this.reflector.getAllAndOverride<PermissionsKeys[]>(REQUIRE_PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }
    const accessGranted = this.rolesAndPermissionsService.checkPermissions(user.id, ...requiredPermissions)
    return accessGranted;
  }
}
