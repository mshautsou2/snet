import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException as NestNotFoundException,
  UnauthorizedException as NestUnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ModelNotFoundError } from 'errors/entity-not-found.error';
import { UnauthorizedError } from 'errors/unauthorized.error';

@Injectable()
export class ExceptionMapperInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof ModelNotFoundError) {
          throw new NestNotFoundException(error.message);
        }
        if (error instanceof UnauthorizedError) {
          throw new NestUnauthorizedException(error.message);
        }
        throw error;
      }),
    );
  }
}
