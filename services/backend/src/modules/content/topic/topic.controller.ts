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
import { Topic } from './topic.entity';
import { TopicService } from './topic.service';

@Controller('topics')
@ApiTags('topics')
export class TopicController {
  constructor(private readonly service: TopicService) {}

  @Post()
  @WithOwner()
  @RequirePermissions(PermissionsKeys.EditSelfTopic)
  public async create(@Body() body: Topic) {
    this.transformRequestBody(body);
    return await this.service.createEntity(body);
  }

  @Get('/:id')
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
  @WithOwner()
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnyTopic],
    ownEntityPermissions: [PermissionsKeys.EditSelfTopic],
    entityClass: Topic,
  })
  async update(@Body() body: Topic, @Param('id') entityId: string) {
    this.transformRequestBody(body);
    return await this.service.update(entityId, body);
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

  private transformRequestBody(body: Topic) {
    body.category = (body as any).categoryId;
    delete (body as any).categoryId;
  }
}
