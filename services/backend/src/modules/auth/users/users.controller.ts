import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequirePermissions } from 'decorators/permission.decorator';
import { FindOneParams } from 'modules/shared/dto/find-one.dto';
import { PermissionsKeys } from '../permissions/permissions-keys.constants';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Post('register')
  async registerUser(@Body() user: User) {
    return new User(await this.userService.createEntity(user));
  }

  @Post('login')
  @HttpCode(200)
  async loginUser(@Body() userDto: UserLoginDto) {
    return await this.userService.loginUser(userDto);
  }

  @Get(':id')
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.ViewAnyUser],
    ownEntityPermissions: [PermissionsKeys.ViewSelfUser],
    entityClass: User,
  })
  public async findOne(@Param() params: FindOneParams) {
    return await this.userService.findOneEntity(params.id);
  }

  @Get()
  @RequirePermissions(PermissionsKeys.ViewAnyUser)
  public async findAll() {
    return await this.userService.findAll();
  }

  @Put('/:id')
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnyUser],
    ownEntityPermissions: [PermissionsKeys.EditSelfUser],
    entityClass: User,
  })
  async update(@Param('id') entityId: string, @Body() user: User) {
    return await this.userService.update(entityId, user);
  }

  @Delete('/:id')
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnyUser],
    ownEntityPermissions: [PermissionsKeys.EditSelfUser],
    entityClass: User,
  })
  public async delete(@Param('id') entityId: string) {
    return await this.userService.removeEntity(entityId);
  }
}
