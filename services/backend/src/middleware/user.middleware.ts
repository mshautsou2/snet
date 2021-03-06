import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/modules/auth/users/users.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const sign = req.headers.authorization || '';
    const userPayload = this.userService.decodeAuthToken(
      sign.replace('Bearer ', ''),
    );
    const user = await this.userService.getUserAuth(userPayload);
    req.user = user;
    next();
  }
}
