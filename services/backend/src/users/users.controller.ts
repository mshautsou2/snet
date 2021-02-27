import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { RequirePermissions } from '../roles-and-permissions/decorators/permission.decorator';
import { PermissionsKeys } from '../roles-and-permissions/constants/permissions-keys.constants';
import { ApiTags } from "@nestjs/swagger";
import { FindOneParams } from 'src/shared/dto/find-one.dto';
import { UserLoginDTO } from './dto/user-login.dto';
import { UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  // TODO: MOVE TO AUTH MODULE
  @Post('register')
  // @RequirePermissions(PermissionsKeys.AddUser)
  async registerUser(@Body() user: CreateUserDTO) {
    try {
      return await this.userService.create(user);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('login')
  @HttpCode(200)
  async loginUser(@Body() userDto: UserLoginDTO) {
    return await this.userService.loginUser(userDto);
    

  }

  @Get(':id')
  @RequirePermissions(isOwner => isOwner ? [PermissionsKeys.ViewSelfUser] : [PermissionsKeys.ViewAnyUser])
  async getUser(@Param() params: FindOneParams) {
    console.log(params)
    return 'ok';
  }
}
