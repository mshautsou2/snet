import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionsKeys } from 'src/modules/roles-and-permissions/constants/permissions-keys.constants';
import { UserPayload } from 'src/modules/roles-and-permissions/models/user.payload';
import { RolesAndPermissionsService } from 'src/modules/roles-and-permissions/services/roles-and-permissions.service';
import { ExtractUser } from 'src/modules/users/user.decorator';
import { CreateMessageDTO } from 'src/modules/messages/dto/create-message.dto';
import { MessageResponseDTO } from 'src/modules/messages/dto/message-response.dto';
import { UpdateMessageDTO } from 'src/modules/messages/dto/update-message.dto';
import { MessageService } from 'src/modules/messages/messages.service';

@Controller('messages')
@ApiTags('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessageService, private readonly rolesPermissionService: RolesAndPermissionsService) { }

  @Post()
  async create(@Body() createMessageDTO: CreateMessageDTO, @ExtractUser() user) {
    const accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditSelfMessage);
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to create messages");
    }
    createMessageDTO.ownerId = user.id;
    return MessageResponseDTO.fromEntity(await this.messagesService.create(createMessageDTO));
  }

  @Get()
  async findAll(@ExtractUser() user) {
    const accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.ViewMessage);
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to view messages");
    }
    return (await this.messagesService.findAll()).map(t => MessageResponseDTO.fromEntity(t));
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @ExtractUser() user) {
    const accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.ViewMessage);
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to view sub topics");
    }
    const rawMessage = await this.messagesService.findOne(id)
    return MessageResponseDTO.fromEntity(rawMessage)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMessageDTO: UpdateMessageDTO, @ExtractUser() user) {
    let accessGranted = false;
    const entityOwner = await this.messagesService.isOwner(user.id, id);

    if (entityOwner) {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditSelfMessage);
    } else {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditAnyMessage);
    }
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to edit this message");
    }
    return MessageResponseDTO.fromEntity(await this.messagesService.update(id, updateMessageDTO));
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @ExtractUser() user: UserPayload) {

    let accessGranted = false;

    const entityOwner = await this.messagesService.isOwner(user.id, id);

    if (entityOwner) {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditSelfMessage);
    } else {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditAnyMessage);
    }
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to delete this message");
    }
    return MessageResponseDTO.fromEntity(await this.messagesService.remove(id));
  }
}
