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
import { RequirePermissions } from 'src/decorators/permission.decorator';
import { FindOneParams } from 'src/modules/shared/dto/find-one.dto';
import { PermissionsKeys } from '../permissions/permissions-keys.constants';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  async registerUser(@Body() user: User) {
    return await this.userService.createEntity(user);
  }

  @Post('login')
  @HttpCode(200)
  async loginUser(@Body() userDto: User) {
    return await this.userService.loginUser(userDto);
  }

  @Get(':id')
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.ViewAnyUser],
    ownEntityPermissions: [PermissionsKeys.ViewSelfUser],
    entityName: 'user',
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
    entityName: 'user',
  })
  async update(@Param('id') roleId: string, @Body() role: User) {
    return await this.userService.update(roleId, role);
  }

  @Delete('/:id')
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnyUser],
    ownEntityPermissions: [PermissionsKeys.EditSelfUser],
    entityName: 'user',
  })
  public async delete(@Param() params: { id: string }) {
    return await this.userService.removeEntity(params.id);
  }
}
