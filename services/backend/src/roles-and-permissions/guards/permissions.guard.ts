import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsKeys } from '../constants/permissions-keys.constants';
import { REQUIRE_PERMISSIONS_KEY } from '../decorators/permission.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('user', user)
    // const permissionGranted = await this.



    const requiredPermissionsKeys = this.reflector.getAllAndOverride<PermissionsKeys[]>(REQUIRE_PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissionsKeys) {
      return true;
    }
    console.log('required permisions keys', requiredPermissionsKeys)
      console.log('finding perission in databse...');
    return false;
  }
}
