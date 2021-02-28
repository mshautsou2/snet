import { Controller, Get, Post, Body, Put, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesAndPermissionsService } from 'src/roles-and-permissions/services/roles-and-permissions.service';
import { ExtractUser } from 'src/users/user.decorator';
import { PermissionsKeys } from 'src/roles-and-permissions/constants/permissions-keys.constants';
import { UserPayload } from 'src/roles-and-permissions/models/user.payload';
import { TopicResponseDTO } from './dto/topic-response.dto';

@Controller('topics')
@ApiTags('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService, private readonly rolesPermissionService: RolesAndPermissionsService) {}

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
    console.log('user', user)
    console.log('access granted', accessGranted);
    
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

    console.log('entity owner', entityOwner)
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
