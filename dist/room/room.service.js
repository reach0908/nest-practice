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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const room_entity_1 = require("./entities/room.entity");
const message_entity_1 = require("./entities/message.entity");
let RoomService = class RoomService {
    constructor(roomRepository, messageRepository, userService) {
        this.roomRepository = roomRepository;
        this.messageRepository = messageRepository;
        this.userService = userService;
    }
    async findAll() {
        const rooms = await this.roomRepository.find({
            relations: ['messages'],
        });
        return rooms;
    }
    async findOne(id) {
        const room = await this.roomRepository.findOneBy({ id });
        if (!room) {
            throw new common_1.NotFoundException(`There is no room under id ${id}`);
        }
        return room;
    }
    async findOneWithRelations(id) {
        const room = await this.roomRepository.findOne({
            where: { id },
            relations: ['messages', 'users', 'bannedUsers'],
        });
        if (!room) {
            throw new common_1.NotFoundException(`Room with id ${id} not found`);
        }
        return room;
    }
    async findOneByName(name) {
        const room = await this.roomRepository.findOneBy({
            name,
        });
        return room;
    }
    async create(createRoomDto) {
        const room = await this.roomRepository.create(Object.assign({}, createRoomDto));
        return this.roomRepository.save(room);
    }
    async addMessage(addMessageDto) {
        const { roomId, userId, text } = addMessageDto;
        const room = await this.findOne(roomId);
        const user = await this.userService.findOne(userId);
        const message = await this.messageRepository.create({
            text,
            room,
            user,
        });
        return this.messageRepository.save(message);
    }
    async update(id, updateRoomDto) {
        const room = await this.roomRepository.preload(Object.assign({ id }, updateRoomDto));
        if (!room) {
            throw new common_1.NotFoundException(`Room with id ${id} not found`);
        }
        return this.roomRepository.save(room);
    }
    async banUserFromRoom(banUserDto) {
        const { roomId, userId } = banUserDto;
        const room = await this.findOne(roomId);
        const user = await this.userService.findOne(userId);
        await this.userService.updateUserRoom(userId, null);
        const bannedUsers = Object.assign(Object.assign({}, room.bannedUsers), user);
        const updateRoom = await this.roomRepository.preload({
            id: roomId,
            bannedUsers,
        });
        return this.roomRepository.save(updateRoom);
    }
    async remove(id) {
        const room = await this.findOne(id);
        return this.roomRepository.remove(room);
    }
};
RoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __param(1, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        user_service_1.UserService])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map