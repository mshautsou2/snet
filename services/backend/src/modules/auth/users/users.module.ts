import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from '../roles/role.module';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: 'secret', //MOV TO ENV VARIABLES
      signOptions: { expiresIn: '1m' },
    }),
    RoleModule,
  ],
  providers: [UsersService, UsersController],
  exports: [UsersService, UsersController],
})
export class UsersModule {
  constructor(private userService: UsersService) {}
}
