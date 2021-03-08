import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  WithOwnerConfig,
  WITH_OWNER_DECORATOR_KEY,
} from 'decorators/with-owner.decorator';
import { Observable } from 'rxjs';

@Injectable()
export class WithOwnerInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const withOwnerConfig = this.reflector.getAllAndOverride<WithOwnerConfig>(
      WITH_OWNER_DECORATOR_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (withOwnerConfig) {
      const request = context.switchToHttp().getRequest();
      request.body.owner = <string>request.user;
    }
    return next.handle();
  }
}
