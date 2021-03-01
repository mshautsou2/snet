import { HttpException } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect, SubscribeMessage, WebSocketGateway,
    WebSocketServer,
    WsException
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDTO } from 'src/chat/dto/message.dto';
import { CommentService } from 'src/comments/comments.service';
import { MessageService } from 'src/messsages/messages.service';
import { PermissionsKeys } from 'src/roles-and-permissions/constants/permissions-keys.constants';
import { UserPayload } from 'src/roles-and-permissions/models/user.payload';
import { RolesAndPermissionsService } from 'src/roles-and-permissions/services/roles-and-permissions.service';
import { SubTopicsService } from 'src/subtopics/subtopics.service';
import { UsersService } from 'src/users/users.service';
import { ChatUser } from './chat-user.model';
import { SubtopicAction } from './dto/subtopic-action.dto';

@WebSocketGateway(3001, { namespace: 'chats' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    connectedUsers: ChatUser[] = []//can be moved to database

    constructor(
        private readonly roleAndPermissionService: RolesAndPermissionsService,
        private readonly userService: UsersService,
        private readonly subtopicService: SubTopicsService,
        private readonly messageService: MessageService,
        private readonly commentService: CommentService,
    ) { }

    async handleConnection(socket: Socket) {
        const userPayload: UserPayload = await this.userService.decodeAuthToken(socket.handshake.query.token)
        if (!userPayload) {
            throw new HttpException('Unauthorized access', 2)
        }
        const readAccess: boolean = await this.roleAndPermissionService.checkPermissions(userPayload.id, PermissionsKeys.ViewComment, PermissionsKeys.ViewMessage);
        if (!readAccess) {
            throw new HttpException('Unauthorized access', 2)
        }
        const writeAccess: boolean = await this.roleAndPermissionService.checkPermissions(userPayload.id, PermissionsKeys.EditSelfComment, PermissionsKeys.EditSelfMessage);
        const user = await this.userService.findOne(userPayload.id)
        this.connectedUsers.push({
            id: user.id,
            readOnly: !writeAccess,
            socketId: socket.id,
        })
        this.server.emit('users', this.connectedUsers)
    }

    async handleDisconnect(socket: Socket) {
        ('here')
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

        if (data.replyTo) {
            await this.commentService.create({
                content: data.content,
                messageId: data.replyTo,
                ownerId: user.id,
            })
        } else {
            await this.messageService.create({
                content: data.content,
                ownerId: user.id,
                subtopicId: data.subtopicId,
            })
        }
        client.broadcast.to(data.subtopicId).emit('message', data.content)
    }

}