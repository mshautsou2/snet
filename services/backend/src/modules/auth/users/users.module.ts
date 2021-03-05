import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserMiddleware } from './user.middleware';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret', //MOV TO ENV VARIABLES
      signOptions: { expiresIn: '1m' },
    }),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {
  constructor(private userService: UsersService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
