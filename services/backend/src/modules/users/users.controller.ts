import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { FindOneParams } from 'src/modules/shared/dto/find-one.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserLoginDTO } from './dto/user-login.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post('register')
  async registerUser(@Body() user: CreateUserDTO) {
      return await this.userService.create(user);
  }

  @Post('login')
  @HttpCode(200)
  async loginUser(@Body() userDto: UserLoginDTO) {
    return await this.userService.loginUser(userDto);
  }

  @Get(':id')
  async getUser(@Param() params: FindOneParams) {
    return 'ok';
  }
}
