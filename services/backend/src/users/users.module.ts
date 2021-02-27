import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesAndPermissionsModule } from 'src/roles-and-permissions/roles-and-permissions.module';
import { User } from './user.entity';
import { UserMiddleware } from './user.middleware';
import { UsersService } from './users.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',//MOV TO ENV VARIABLES
      signOptions: { expiresIn: '60m'},//FIX
    }),
    RolesAndPermissionsModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {

  constructor(
    private userService: UsersService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*')
  }
}
