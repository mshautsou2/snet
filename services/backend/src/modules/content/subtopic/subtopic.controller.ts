import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequirePermissions } from 'decorators/permission.decorator';
import { WithOwner } from 'decorators/with-owner.decorator';
import { PermissionsKeys } from 'modules/auth/permissions/permissions-keys.constants';
import { FindOneParams } from 'modules/shared/dto/find-one.dto';
import { Subtopic } from './subtopic.entity';
import { SubtopicService } from './subtopic.service';

@Controller('subtopics')
@ApiTags('subtopics')
export class SubtopicController {
  constructor(private readonly service: SubtopicService) {}

  @Post()
  @WithOwner()
  @RequirePermissions(PermissionsKeys.ViewSubtopic)
  public async create(@Body() body: Subtopic) {
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
    anyEntityPermissions: [PermissionsKeys.EditAnySubtopic],
    ownEntityPermissions: [PermissionsKeys.EditSelfSubtopic],
    entityClass: Subtopic,
  })
  async update(@Body() body: Subtopic, @Param('id') entityId: string) {
    this.transformRequestBody(body);
    return await this.service.update(entityId, body);
  }

  @Delete('/:id')
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnySubtopic],
    ownEntityPermissions: [PermissionsKeys.EditSelfSubtopic],
    entityClass: Subtopic,
  })
  public async delete(@Param('id') entityId: string) {
    return await this.service.removeEntity(entityId);
  }

  private transformRequestBody(body: Subtopic) {
    body.topic = (body as any).topicId;
    delete (body as any).topicId;
  }
}
