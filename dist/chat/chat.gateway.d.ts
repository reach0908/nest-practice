import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { RoomService } from 'src/room/room.service';
import { AddMessageDto } from 'src/chat/dto/add-message.dto';
import { JoinRoomDto } from 'src/chat/dto/join-room.dto';
import { LeaveRoomDto } from 'src/chat/dto/leave-room.dto';
import { KickUserDto } from 'src/chat/dto/kick-user.dto';
import { BanUserDto } from 'src/chat/dto/ban-user.dto';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly userService;
    private readonly authService;
    private readonly roomService;
    server: any;
    connectedUsers: Map<string, string>;
    constructor(userService: UserService, authService: AuthService, roomService: RoomService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    onMessage(client: Socket, addMessageDto: AddMessageDto): Promise<void>;
    onRoomJoin(client: Socket, joinRoomDto: JoinRoomDto): Promise<void>;
    onRoomLeave(client: Socket, leaveRoomDto: LeaveRoomDto): Promise<void>;
    onUserKick(client: Socket, kickUserDto: KickUserDto): Promise<void>;
    onUserBan(client: Socket, banUserDto: BanUserDto): Promise<void>;
    private getClientByUserId;
}
