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
import { Subtopic } from './subtopic.entity';
import { SubtopicService } from './subtopic.service';

@Controller('subtopics')
@ApiTags('subtopics')
export class SubtopicController {
  constructor(private readonly service: SubtopicService) {}

  @Post()
  @RequirePermissions(PermissionsKeys.EditSelfSubTopic)
  public async create(@Body() body: Subtopic) {
    return await this.service.createEntity(body);
  }

  @Get(':id')
  @RequirePermissions(PermissionsKeys.ViewSubTopic)
  public async findOne(@Param() params: FindOneParams) {
    return await this.service.findOneEntity(params.id);
  }

  @Get()
  @RequirePermissions(PermissionsKeys.ViewSubTopic)
  public async findAll() {
    return await this.service.findAllEntities();
  }

  @Put('/:id')
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnySubTopic],
    ownEntityPermissions: [PermissionsKeys.EditSelfSubTopic],
    entityClass: Subtopic,
  })
  async update(@Param('id') entityId: string, @Body() user: Subtopic) {
    return await this.service.update(entityId, user);
  }

  @Delete('/:id')
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnyTopic],
    ownEntityPermissions: [PermissionsKeys.EditSelfTopic],
    entityClass: Subtopic,
  })
  public async delete(@Param('id') entityId: string) {
    return await this.service.removeEntity(entityId);
  }
}
