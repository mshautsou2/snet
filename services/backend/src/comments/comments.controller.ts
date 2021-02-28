import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionsKeys } from 'src/roles-and-permissions/constants/permissions-keys.constants';
import { UserPayload } from 'src/roles-and-permissions/models/user.payload';
import { RolesAndPermissionsService } from 'src/roles-and-permissions/services/roles-and-permissions.service';
import { ExtractUser } from 'src/users/user.decorator';
import { CommentService } from './comments.service';
import { CommentResponseDTO } from './dto/comment-response.dto';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentService, private readonly rolesPermissionService: RolesAndPermissionsService) { }

  @Post()
  async create(@Body() createCommentDTO: CreateCommentDTO, @ExtractUser() user) {
    const accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditSelfComment);
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to leave comments");
    }
    createCommentDTO.ownerId = user.id;
    return CommentResponseDTO.fromEntity(await this.commentsService.create(createCommentDTO));
  }

  @Get()
  async findAll(@ExtractUser() user) {
    const accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.ViewComment);
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to view comments");
    }
    return (await this.commentsService.findAll()).map(t => CommentResponseDTO.fromEntity(t));
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @ExtractUser() user) {
    const accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.ViewComment);
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to view comments");
    }
    const rawComment = await this.commentsService.findOne(id)
    return CommentResponseDTO.fromEntity(rawComment)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCommentDTO: UpdateCommentDTO, @ExtractUser() user) {
    let accessGranted = false;
    const entityOwner = await this.commentsService.isOwner(user.id, id);

    if (entityOwner) {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditSelfComment);
    } else {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditAnyComment);
    }
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to edit this comment");
    }
    return CommentResponseDTO.fromEntity(await this.commentsService.update(id, updateCommentDTO));
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @ExtractUser() user: UserPayload) {

    let accessGranted = false;

    const entityOwner = await this.commentsService.isOwner(user.id, id);

    if (entityOwner) {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditSelfComment);
    } else {
      accessGranted = await this.rolesPermissionService.checkPermissions(user.id, PermissionsKeys.EditAnyComment);
    }
    if (!accessGranted) {
      throw new UnauthorizedException("You do not have permissions to delete this comment");
    }
    return CommentResponseDTO.fromEntity(await this.commentsService.remove(id));
  }
}
