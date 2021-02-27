import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { RequirePermissions } from '../roles-and-permissions/decorators/permission.decorator';
import { PermissionsKeys } from '../roles-and-permissions/constants/permissions-keys.constants';
import {ApiTags} from "@nestjs/swagger";

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}

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
}
