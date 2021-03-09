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
import { WithOwner } from 'decorators/with-owner.decorator';
import { PermissionsKeys } from 'modules/auth/permissions/permissions-keys.constants';
import { FindOneParams } from 'modules/shared/dto/find-one.dto';
import { Message } from './message.entity';
import { MessageService } from './message.service';

@Controller('messages')
@ApiTags('messages')
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @Post()
  @WithOwner()
  @RequirePermissions(PermissionsKeys.EditSelfSubtopic)
  public async create(@Body() body: Message) {
    this.transformRequestBody(body);
    return await this.service.createEntity(body);
  }

  @Get('/:id')
  @RequirePermissions(PermissionsKeys.ViewSubtopic)
  public async findOne(@Param() params: FindOneParams) {
    return await this.service.findOneEntity(params.id);
  }

  @Get()
  @RequirePermissions(PermissionsKeys.ViewSubtopic)
  public async findAll() {
    return await this.service.findAllEntities();
  }

  @Put('/:id')
  @WithOwner()
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnyMessage],
    ownEntityPermissions: [PermissionsKeys.EditSelfMessage],
    entityClass: Message,
  })
  async update(@Body() message: Message, @Param('id') entityId: string) {
    this.transformRequestBody(message);
    return await this.service.update(entityId, message);
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

  private transformRequestBody(body: Message) {
    body.subtopic = (body as any).subtopicId;
    delete (body as any).subtopicId;
  }
}
