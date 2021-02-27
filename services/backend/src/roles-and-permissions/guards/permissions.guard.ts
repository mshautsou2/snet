import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/user.entity';
import { PermissionsKeys } from '../constants/permissions-keys.constants';
import { REQUIRE_PERMISSIONS_KEY } from '../decorators/permission.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    console.log('user', user)
    // const permissionGranted = await this.
    
    

    const permissionFunc = this.reflector.getAllAndOverride<(isOwner) => PermissionsKeys[]>(REQUIRE_PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!permissionFunc) {
      return true;
    }
    console.log('user id', user.id)
    console.log('request params', request.params)
    console.log('required permisions keys', permissionFunc(user.id === request.params.id))
      console.log('finding perission in databse...');
    return false;
  }
}
