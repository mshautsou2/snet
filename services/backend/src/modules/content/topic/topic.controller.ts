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
import { Topic } from './topic.entity';
import { TopicService } from './topic.service';

@Controller('categories/:categoryId/topics')
@ApiTags('topics')
export class TopicController {
  constructor(private readonly service: TopicService) {}

  @Post()
  @RequirePermissions(PermissionsKeys.EditSelfTopic)
  public async create(@Body() body: Topic) {
    return await this.service.createEntity(body);
  }

  @Get(':id')
  @RequirePermissions(PermissionsKeys.ViewTopic)
  public async findOne(@Param() params: FindOneParams) {
    return await this.service.findOneEntity(params.id);
  }

  @Get()
  @RequirePermissions(PermissionsKeys.ViewTopic)
  public async findAll() {
    return await this.service.findAllEntities();
  }

  @Put('/:id')
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnyTopic],
    ownEntityPermissions: [PermissionsKeys.EditSelfTopic],
    entityClass: Topic,
  })
  async update(@Param('id') entityId: string, @Body() user: Topic) {
    return await this.service.update(entityId, user);
  }

  @Delete('/:id')
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnyTopic],
    ownEntityPermissions: [PermissionsKeys.EditSelfTopic],
    entityClass: Topic,
  })
  public async delete(@Param('id') entityId: string) {
    return await this.service.removeEntity(entityId);
  }
}
