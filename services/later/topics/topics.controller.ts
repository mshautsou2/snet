import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionsKeys } from 'src/modules/permissions/permissions-keys.constants';
import { UserPayload } from 'src/modules/auth/users/node_modules/src/modules/permissions/dto/user.payload';
import { RolesAndPermissionsService } from 'src/modules/permissions/services/roles-and-permissions.service';
import { ExtractUser } from 'src/modules/auth/users/user.decorator';
import { CreateTopicDto } from './dto/create-topic.dto';
import { TopicResponseDTO } from './dto/topic-response.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicsService } from './topics.service';

@Controller('topics')
@ApiTags('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService, private readonly rolesPermissionService: RolesAndPermissionsService) { }

  @Post()
  async create(@Body() createTopicDto: CreateTopicDto, @ExtractUser() user) {
    const accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditSelfTopic);
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to create topic");
    }
    createTopicDto.ownerId = user.id;
    return TopicResponseDTO.fromEntity(await this.topicsService.create(createTopicDto));
  }

  @Get()
  async findAll(@ExtractUser() user) {
    const accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.ViewTopic);
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to view topics");
    }
    return (await this.topicsService.findAll()).map(t => TopicResponseDTO.fromEntity(t));
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @ExtractUser() user) {
    const accessGranted = this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.ViewTopic);
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to view topics");
    }
    const rawTopic = await this.topicsService.findOne(id)
    return TopicResponseDTO.fromEntity(rawTopic)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto, @ExtractUser() user) {
    let accessGranted = false;
    const entityOwner = await this.topicsService.isOwner(user.id, id);

    if (entityOwner) {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditSelfTopic);
    } else {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditAnyTopic);
    }
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to edit this topic");
    }
    return TopicResponseDTO.fromEntity(await this.topicsService.update(id, updateTopicDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @ExtractUser() user: UserPayload) {

    let accessGranted = false;

    const entityOwner = await this.topicsService.isOwner(user.id, id);

    if (entityOwner) {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditSelfTopic);
    } else {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditAnyTopic);
    }
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to delete this topic");
    }
    return TopicResponseDTO.fromEntity(await this.topicsService.remove(id));
  }
}
