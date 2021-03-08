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
import { Category } from '../category/category.entity';
import { CreateTopicParams } from './dto/create-topic.params';
import { UpdateTopicParams } from './dto/update-topic.params';
import { Topic } from './topic.entity';
import { TopicService } from './topic.service';

@Controller('')
@ApiTags('topics')
export class TopicController {
  constructor(private readonly service: TopicService) {}

  @Post('/categories/:categoryId/topics')
  @WithOwner()
  @RequirePermissions(PermissionsKeys.ViewTopic)
  public async create(@Body() body: Topic, @Param() params: CreateTopicParams) {
    body.category = (params.categoryId as unknown) as Category;
    return await this.service.createEntity(body);
  }

  @Get('/topics/:id')
  @RequirePermissions(PermissionsKeys.ViewTopic)
  public async findOne(@Param() params: FindOneParams) {
    return await this.service.findOneEntity(params.id);
  }

  @Get('/topics')
  @RequirePermissions(PermissionsKeys.ViewTopic)
  public async findAll() {
    return await this.service.findAllEntities();
  }

  @Put('/categories/:categoryId/topics/:id')
  @WithOwner()
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.ViewTopic],
    ownEntityPermissions: [PermissionsKeys.ViewTopic],
    entityClass: Topic,
  })
  async update(@Body() topic: Topic, @Param() params: UpdateTopicParams) {
    topic.category = (params.categoryId as unknown) as Category;
    return await this.service.update(params.id, topic);
  }

  @Delete('/topics/:id')
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnyTopic],
    ownEntityPermissions: [PermissionsKeys.EditSelfTopic],
    entityClass: Topic,
  })
  public async delete(@Param('id') entityId: string) {
    return await this.service.removeEntity(entityId);
  }
}
