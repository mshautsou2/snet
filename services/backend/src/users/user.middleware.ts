
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {


  constructor(
    private userService: UsersService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('extracting user in user middleware...');
    const sign = req.headers.authorization || '';
    const userPayload = this.userService.decodeAuthToken(sign.replace('Bearer', ''));
    const user = await this.userService.getUserAuth(userPayload);
    req.user = user;
    next();
  }
}