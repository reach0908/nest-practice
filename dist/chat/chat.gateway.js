"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("../auth/auth.service");
const room_service_1 = require("../room/room.service");
const add_message_dto_1 = require("./dto/add-message.dto");
const join_room_dto_1 = require("./dto/join-room.dto");
const leave_room_dto_1 = require("./dto/leave-room.dto");
const kick_user_dto_1 = require("./dto/kick-user.dto");
const ban_user_dto_1 = require("./dto/ban-user.dto");
let ChatGateway = class ChatGateway {
    constructor(userService, authService, roomService) {
        this.userService = userService;
        this.authService = authService;
        this.roomService = roomService;
        this.connectedUsers = new Map();
    }
    async handleConnection(client) {
        const token = client.handshake.query.token.toString();
        const payload = this.authService.verifyAccessToken(token);
        const user = payload && (await this.userService.findOne(payload.id));
        const room = user === null || user === void 0 ? void 0 : user.room;
        if (!user) {
            client.disconnect(true);
            return;
        }
        this.connectedUsers.set(client.id, user.id);
        if (room) {
            return this.onRoomJoin(client, { roomId: room.id });
        }
    }
    async handleDisconnect(client) {
        this.connectedUsers.delete(client.id);
    }
    async onMessage(client, addMessageDto) {
        const userId = this.connectedUsers.get(client.id);
        const user = await this.userService.findOne(userId);
        if (!user.room) {
            return;
        }
        addMessageDto.userId = userId;
        addMessageDto.roomId = user.room.id;
        await this.roomService.addMessage(addMessageDto);
        client.to(user.room.id).emit('message', addMessageDto.text);
    }
    async onRoomJoin(client, joinRoomDto) {
        const { roomId } = joinRoomDto;
        const limit = 10;
        const room = await this.roomService.findOneWithRelations(roomId);
        if (!room) {
            return;
        }
        const userId = this.connectedUsers.get(client.id);
        const messages = room.messages.slice(limit * -1);
        await this.userService.updateUserRoom(userId, room);
        client.join(roomId);
        client.emit('message', messages);
    }
    async onRoomLeave(client, leaveRoomDto) {
        const { roomId } = leaveRoomDto;
        const userId = this.connectedUsers.get(client.id);
        await this.userService.updateUserRoom(userId, null);
        client.leave(roomId);
    }
    async onUserKick(client, kickUserDto) {
        const { roomId, reason } = kickUserDto;
        const userId = this.connectedUsers.get(client.id);
        const room = await this.roomService.findOneWithRelations(roomId);
        if (userId !== room.ownerId) {
            throw new common_1.ForbiddenException('You are not the owner of this room');
        }
        await this.userService.updateUserRoom(kickUserDto.userId, null);
        const kickedClient = this.getClientByUserId(kickUserDto.userId);
        if (!kickedClient) {
            return;
        }
        client.to(kickedClient.id).emit('kicked', reason);
        kickedClient.leave(roomId);
    }
    async onUserBan(client, banUserDto) {
        const { roomId, reason } = banUserDto;
        const userId = this.connectedUsers.get(client.id);
        const room = await this.roomService.findOneWithRelations(roomId);
        if (userId !== room.ownerId) {
            throw new common_1.ForbiddenException('You are not the owner of this room');
        }
        await this.roomService.banUserFromRoom(banUserDto);
        const bannedClient = this.getClientByUserId(banUserDto.userId);
        if (!bannedClient) {
            return;
        }
        client.to(bannedClient.id).emit('banned', reason);
        bannedClient.leave(roomId);
    }
    getClientByUserId(userId) {
        for (const [key, value] of this.connectedUsers.entries()) {
            if (value === userId) {
                const kickedClient = this.server.sockets.sockets.get(key);
                return kickedClient;
            }
        }
        return null;
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, add_message_dto_1.AddMessageDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, join_room_dto_1.JoinRoomDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onRoomJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, leave_room_dto_1.LeaveRoomDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onRoomLeave", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('user-kick'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, kick_user_dto_1.KickUserDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onUserKick", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('user-ban'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, ban_user_dto_1.BanUserDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onUserBan", null);
ChatGateway = __decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        room_service_1.RoomService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map