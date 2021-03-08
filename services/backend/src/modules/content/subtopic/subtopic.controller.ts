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
import { Topic } from '../topic/topic.entity';
import { CreateSubtopicParams } from './dto/create-subtopic.params';
import { UpdateTopicParams } from './dto/update-subtopic.params';
import { Subtopic } from './subtopic.entity';
import { SubtopicService } from './subtopic.service';

@Controller('')
@ApiTags('subtopics')
export class SubtopicController {
  constructor(private readonly service: SubtopicService) {}

  @Post('/topics/:topicId/subtopics')
  @WithOwner()
  @RequirePermissions(PermissionsKeys.ViewTopic)
  public async create(
    @Body() body: Subtopic,
    @Param() params: CreateSubtopicParams,
  ) {
    body.topic = (params.topicId as unknown) as Topic;
    return await this.service.createEntity(body);
  }

  @Get('/subtopics/:id')
  @RequirePermissions(PermissionsKeys.ViewTopic)
  public async findOne(@Param() params: FindOneParams) {
    return await this.service.findOneEntity(params.id);
  }

  @Get('/subtopics/')
  @RequirePermissions(PermissionsKeys.ViewTopic)
  public async findAll() {
    return await this.service.findAllEntities();
  }

  @Put('/topics/:topicId/subtopics/:id')
  @WithOwner()
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.ViewSubTopic],
    ownEntityPermissions: [PermissionsKeys.ViewSubTopic],
    entityClass: Subtopic,
  })
  async update(@Body() subtopic: Subtopic, @Param() params: UpdateTopicParams) {
    return await this.service.update(params.id, subtopic);
  }

  @Delete('/subtopics/:id')
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.ViewSubTopic],
    ownEntityPermissions: [PermissionsKeys.ViewSubTopic],
    entityClass: Subtopic,
  })
  public async delete(@Param('id') entityId: string) {
    return await this.service.removeEntity(entityId);
  }
}
