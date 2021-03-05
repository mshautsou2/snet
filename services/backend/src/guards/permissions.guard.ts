import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/modules/auth/users/user.entity';
import { RolesService } from '../modules/auth/roles/roles.service';
import { REQUIRE_PERMISSIONS_KEY } from '../decorators/permission.decorator';
import { PermissionsKeys } from '../modules/auth/permissions/permissions-keys.constants';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rolesService: RolesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const request = context.switchToHttp().getRequest();
    // const user: User = request.user;

    // const requiredPermissions = this.reflector.getAllAndOverride<
    //   PermissionsKeys[]
    // >(REQUIRE_PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
    // if (!requiredPermissions || requiredPermissions.length === 0) {
    //   return true;
    // }
    // const accessGranted = this.rolesService.checkPermissions(
    //   user.id,
    //   ...requiredPermissions,
    // );
    return true;
    // return accessGranted;
  }
}
