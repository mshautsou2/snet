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
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Controller('comments')
@ApiTags('comments')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Post()
  @WithOwner()
  @RequirePermissions(PermissionsKeys.EditSelfComment)
  public async create(@Body() body: Comment) {
    this.transformRequestBody(body);
    return await this.service.createEntity(body);
  }

  @Get(':id')
  @RequirePermissions(PermissionsKeys.ViewComment)
  public async findOne(@Param() params: FindOneParams) {
    return await this.service.findOneEntity(params.id);
  }

  @Get()
  @RequirePermissions(PermissionsKeys.ViewComment)
  public async findAll() {
    return await this.service.findAllEntities();
  }

  @Put('/:id')
  @WithOwner()
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnyComment],
    ownEntityPermissions: [PermissionsKeys.EditSelfComment],
    entityClass: Comment,
  })
  async update(@Param('id') entityId: string, @Body() body: Comment) {
    this.transformRequestBody(body);
    return await this.service.update(entityId, body);
  }

  @Delete('/:id')
  @RequirePermissions({
    anyEntityPermissions: [PermissionsKeys.EditAnyMessage],
    ownEntityPermissions: [PermissionsKeys.EditSelfMessage],
    entityClass: Comment,
  })
  public async delete(@Param('id') entityId: string) {
    return await this.service.removeEntity(entityId);
  }

  private transformRequestBody(body: Comment) {
    body.message = (body as any).messageId;
    delete (body as any).messageId;
  }
}
