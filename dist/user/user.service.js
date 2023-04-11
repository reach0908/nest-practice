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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const user = await this.userRepository.create(Object.assign({}, createUserDto));
        return this.userRepository.save(user);
    }
    async findAll() {
        const users = await this.userRepository.find();
        return users;
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['room'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`There is no user with id ${id}`);
        }
        return user;
    }
    async findByUsername(username) {
        const user = await this.userRepository.findOneBy({ username });
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.preload(Object.assign({ id }, updateUserDto));
        if (!user) {
            throw new common_1.NotFoundException(`There is no user with id ${id}`);
        }
        return this.userRepository.save(user);
    }
    async updateUserRoom(id, room) {
        var _a;
        const user = await this.userRepository.preload({
            id,
            room,
        });
        if (!user) {
            throw new common_1.NotFoundException(`There is no user with id ${id}`);
        }
        const isBanned = (_a = user.bannedRooms) === null || _a === void 0 ? void 0 : _a.find((bannedRoom) => bannedRoom.id === (room === null || room === void 0 ? void 0 : room.id));
        if (isBanned) {
            throw new common_1.ForbiddenException('You are banned from this room');
        }
        return this.userRepository.save(user);
    }
    async remove(id) {
        const user = await this.findOne(id);
        return this.userRepository.remove(user);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map