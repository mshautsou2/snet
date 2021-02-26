import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { RequirePermissions } from '../roles-and-permissions/decorators/permission.decorator';
import { UsersPermissionsKeys } from '../roles-and-permissions/constants/user-permissions-keys.constants';
import {ApiTags} from "@nestjs/swagger";

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  @RequirePermissions(UsersPermissionsKeys.AddUser)
  async registerUser(@Body() user: CreateUserDTO) {
    try {
      return await this.userService.create(user);
    } catch (e) {
      console.log(e);
    }
  }
}
