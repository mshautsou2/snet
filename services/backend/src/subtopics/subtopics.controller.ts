import { Controller, Get, Post, Body, Put, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { SubTopicsService } from './subtopics.service';
import { CreateSubTopicDTO } from './dto/create-sub-topic.dto';
import { UpdateSubTopicDto } from './dto/update-topic.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesAndPermissionsService } from 'src/roles-and-permissions/services/roles-and-permissions.service';
import { ExtractUser } from 'src/users/user.decorator';
import { PermissionsKeys } from 'src/roles-and-permissions/constants/permissions-keys.constants';
import { UserPayload } from 'src/roles-and-permissions/models/user.payload';
import { SubTopicResponseDTO } from './dto/subtopic-response.dto';

@Controller('subtopics')
@ApiTags('subtopics')
export class SubTopicsController {
  constructor(private readonly subtopicsService: SubTopicsService, private readonly rolesPermissionService: RolesAndPermissionsService) {}

  @Post()
  async create(@Body() createSubTopicDto: CreateSubTopicDTO, @ExtractUser() user) {
    const accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditSelfSubTopic);
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to create sub topics");
    }
    createSubTopicDto.ownerId = user.id;
    return SubTopicResponseDTO.fromEntity(await this.subtopicsService.create(createSubTopicDto));
  }

  @Get()
  async findAll(@ExtractUser() user) {
    const accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.ViewSubTopic);
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to view sub topics");
    }
    return (await this.subtopicsService.findAll()).map(t => SubTopicResponseDTO.fromEntity(t));
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @ExtractUser() user) {
    const accessGranted = this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.ViewSubTopic);
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to view sub topics");
    }
    const rawSubTopic = await this.subtopicsService.findOne(id)
    return SubTopicResponseDTO.fromEntity(rawSubTopic)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSubTopicDto: UpdateSubTopicDto, @ExtractUser() user) {
    let accessGranted = false;
    const entityOwner = await this.subtopicsService.isOwner(user.id, id);

    console.log('entity owner', entityOwner)
    if (entityOwner) {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditSelfSubTopic);
    } else {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditAnySubTopic);
    }
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to edit this sub topic");
    }
    return SubTopicResponseDTO.fromEntity(await this.subtopicsService.update(id, updateSubTopicDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @ExtractUser() user: UserPayload) {

    let accessGranted = false;

    const entityOwner = await this.subtopicsService.isOwner(user.id, id);

    if (entityOwner) {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditSelfSubTopic);
    } else {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditAnySubTopic);
    }
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to delete this sub topic");
    }
    return SubTopicResponseDTO.fromEntity(await this.subtopicsService.remove(id));
  }
}
