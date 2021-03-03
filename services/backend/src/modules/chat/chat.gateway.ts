import { HttpException } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect, SubscribeMessage, WebSocketGateway,
    WebSocketServer,
    WsException
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDTO } from 'src/modules/chat/dto/message.dto';
import { CommentService } from 'src/modules/comments/comments.service';
import { MessageService } from 'src/modules/messages/messages.service';
import { PermissionsKeys } from 'src/modules/permissions/permissions-keys.constants';
import { UserPayload } from 'src/modules/permissions/user.payload';
import { RolesAndPermissionsService } from 'src/modules/permissions/services/roles-and-permissions.service';
import { SubTopicsService } from 'src/modules/subtopics/subtopics.service';
import { UsersService } from 'src/modules/users/users.service';
import { Comment } from '../comments/comment.entity';
import { Message } from '../messages/entities/message.entity';
import { ChatUser } from './chat-user.model';
import { SubtopicAction } from './dto/subtopic-action.dto';

@WebSocketGateway(3001, { namespace: 'chats' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    connectedUsers: ChatUser[] = []

    constructor(
        private readonly roleAndPermissionService: RolesAndPermissionsService,
        private readonly userService: UsersService,
        private readonly subtopicService: SubTopicsService,
        private readonly messageService: MessageService,
        private readonly commentService: CommentService,
    ) { }

    async handleConnection(socket: Socket) {
        const userPayload: UserPayload = await this.userService.decodeAuthToken(socket.handshake.query.token)
        const { id } = userPayload;
        if (!userPayload) {
            throw new HttpException('Unauthorized access', 2)
        }
        const canRead: boolean = await this.roleAndPermissionService.checkPermissions(id, PermissionsKeys.ViewComment, PermissionsKeys.ViewMessage);
        if (!canRead) {
            throw new HttpException('Unauthorized access', 2)
        }
        const canWrite = await this.roleAndPermissionService.checkPermissions(id, PermissionsKeys.EditSelfComment, PermissionsKeys.EditSelfMessage);
        const user = await this.userService.findOne(id)

        this.connectedUsers.push({
            id: user.id,
            readOnly: !canWrite,
            socketId: socket.id,
        })
        this.server.emit('users', this.connectedUsers)
    }

    async handleDisconnect(socket: Socket) {
        const userPayload: UserPayload = await this.userService.decodeAuthToken(socket.handshake.query.token)
        if (!userPayload) {
            throw new WsException('Unauthorized access')
        }

        this.connectedUsers = this.connectedUsers.filter(u => u.id !== userPayload.id)
        this.server.emit('users', this.connectedUsers)
    }

    @SubscribeMessage('join')
    async onSubtopicJoin(client, data: SubtopicAction) {
        client.join(data.subtopicId)

        const messages = await this.subtopicService.findMessagesAndComments(data.subtopicId, 25);
        client.emit('message', messages)
    }

    @SubscribeMessage('leave')
    async onSubtopicLeave(client, data: SubtopicAction) {
        client.leave(data.subtopicId)
    }

    @SubscribeMessage('message')
    async onMessage(client: Socket, data: MessageDTO) {
        const user = this.connectedUsers.find(u => u.socketId === client.id)
        const canLeaveMessage = !user.readOnly
        if (!canLeaveMessage) {
            throw new WsException('You do not have permissions to leave messages')
        }

        const body = { content: data.content }
        if (data.replyTo) {
            await this.commentService.create(new Comment(body), data.replyTo, user.id)

        } else {
            await this.messageService.create(new Message(body), , user.id)
            await this.messageService.create({
                content: data.content,
                ownerId: user.id,
                subtopicId: data.subtopicId,
            })
        }
        client.broadcast.to(data.subtopicId).emit('message', data.content)
    }

}