import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequirePermissions } from 'decorators/permission.decorator';
import { PermissionsKeys } from 'modules/auth/permissions/permissions-keys.constants';
import { FindOneParams } from 'modules/shared/dto/find-one.dto';
import { Message } from './message.entity';
import { MessageService } from './message.service';

@Controller('messages')
@ApiTags('messages')
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @Post()
  @RequirePermissions(PermissionsKeys.EditSelfMessage)
  public async create(@Body() body: Message) {
    return await this.service.createEntity(body);
  }

  @Get(':id')
  @RequirePermissions(PermissionsKeys.ViewMessage)
  public async findOne(@Param() params: FindOneParams) {
    return await this.service.findOneEntity(params.id);
  }

  @Get()
  @RequirePermissions(PermissionsKeys.ViewMessage)
  public async findAll() {
    return await this.service.findAllEntities();
  }

  @Put('/:id')
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnyMessage],
    ownEntityPermissions: [PermissionsKeys.EditSelfMessage],
    entityClass: Message,
  })
  async update(@Param('id') entityId: string, @Body() user: Message) {
    return await this.service.update(entityId, user);
  }

  @Delete('/:id')
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnyMessage],
    ownEntityPermissions: [PermissionsKeys.EditSelfMessage],
    entityClass: Message,
  })
  public async delete(@Param('id') entityId: string) {
    return await this.service.removeEntity(entityId);
  }
}
