import { HttpException, HttpStatus } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { UserPayload } from 'modules/auth/permissions/dto/user.payload';
import { PermissionsKeys } from 'modules/auth/permissions/permissions-keys.constants';
import { RolesService } from 'modules/auth/roles/roles.service';
import { UsersService } from 'modules/auth/users/users.service';
import { Server, Socket } from 'socket.io';
import { Comment } from '../comments/comment.entity';
import { CommentService } from '../comments/comment.service';
import { Message } from '../messages/message.entity';
import { MessageService } from '../messages/message.service';
import { SubtopicService } from '../subtopic/subtopic.service';
import { ChatUser } from './chat-user.model';
import { MessageDTO } from './dto/message.dto';
import { SubtopicAction } from './dto/subtopic-action.dto';

@WebSocketGateway(3001, { namespace: 'chats' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  connectedUsers: ChatUser[] = [];

  constructor(
    private userService: UsersService,
    private roleService: RolesService,
    private subtopicService: SubtopicService,
    private messageService: MessageService,
    private commentService: CommentService,
  ) {}

  async handleConnection(socket: Socket) {
    const userPayload: UserPayload = await this.userService.decodeAuthToken(
      socket.handshake.query.token,
    );
    if (!userPayload) {
      this.throwUnauthorizedException();
    }
    const { id } = userPayload;

    const canRead: boolean = await this.roleService.hasPermissions(
      id,
      PermissionsKeys.ViewComment,
      PermissionsKeys.ViewMessage,
    );
    if (!canRead) {
      this.throwUnauthorizedException();
    }
    const canWrite = await this.roleService.hasPermissions(
      id,
      PermissionsKeys.EditSelfComment,
      PermissionsKeys.EditSelfMessage,
    );
    const user = await this.userService.findOneEntity(id);

    this.connectedUsers.push({
      id: user.id,
      readOnly: !canWrite,
      socketId: socket.id,
    });
    this.server.emit('users', this.connectedUsers);
  }

  async handleDisconnect(socket: Socket) {
    const userPayload: UserPayload = await this.userService.decodeAuthToken(
      socket.handshake.query.token,
    );
    this.throwUnauthorizedException();

    this.connectedUsers = this.connectedUsers.filter(
      (u) => u.id !== userPayload.id,
    );
    this.server.emit('users', this.connectedUsers);
  }

  @SubscribeMessage('join')
  async onSubtopicJoin(client, data: SubtopicAction) {
    client.join(data.subtopicId);

    const messages = await this.subtopicService.findMessagesAndComments(
      data.subtopicId,
      25,
    );
    client.emit('message', messages);
  }

  @SubscribeMessage('leave')
  async onSubtopicLeave(client, data: SubtopicAction) {
    client.leave(data.subtopicId);
  }

  @SubscribeMessage('message')
  async onMessage(client: Socket, data: MessageDTO) {
    const user = this.connectedUsers.find((u) => u.socketId === client.id);
    const canLeaveMessage = !user.readOnly;
    this.throwUnauthorizedException();

    if (data.replyTo) {
      await this.commentService.createEntity(
        new Comment({
          id: user.id,
          content: data.content,
          message: data.replyTo as any,
          owner: user.id as any,
        }),
      );
    } else {
      await this.messageService.createEntity(
        new Message({
          content: data.content,
          owner: user.id as any,
          subtopic: data.subtopicId as any,
        }),
      );
    }
    client.broadcast.to(data.subtopicId).emit('message', data.content);
  }

  private throwUnauthorizedException() {
    throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }
}
