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
import { Subtopic } from '../subtopic/subtopic.entity';
import { CreateMessageParams } from './dto/create-message.params';
import { UpdateMessageParams } from './dto/update-message.params';
import { Message } from './message.entity';
import { MessageService } from './message.service';

@Controller('')
@ApiTags('messages')
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @Post('/subtopics/:subtopicId/messages')
  @WithOwner()
  @RequirePermissions(PermissionsKeys.ViewTopic)
  public async create(
    @Body() body: Message,
    @Param() params: CreateMessageParams,
  ) {
    body.subtopic = (params.subtopicId as unknown) as Subtopic;
    return await this.service.createEntity(body);
  }

  @Get('/messages/:id')
  @RequirePermissions(PermissionsKeys.ViewCategory)
  public async findOne(@Param() params: FindOneParams) {
    return await this.service.findOneEntity(params.id);
  }

  @Get('/messages/')
  @RequirePermissions(PermissionsKeys.ViewCategory)
  public async findAll() {
    return await this.service.findAllEntities();
  }

  @Put('/subtopics/:subtopicId/messages/:id')
  @WithOwner()
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnyMessage],
    ownEntityPermissions: [PermissionsKeys.EditSelfMessage],
    entityClass: Message,
  })
  async update(@Body() message: Message, @Param() params: UpdateMessageParams) {
    message.subtopic = (params.subtopicId as unknown) as Subtopic;
    return await this.service.update(params.id, message);
  }

  @Delete('/messages/:id')
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnyMessage],
    ownEntityPermissions: [PermissionsKeys.EditSelfMessage],
    entityClass: Message,
  })
  public async delete(@Param('id') entityId: string) {
    return await this.service.removeEntity(entityId);
  }
}
