"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("../user/user.module");
const room_entity_1 = require("./entities/room.entity");
const message_entity_1 = require("./entities/message.entity");
const room_controller_1 = require("./room.controller");
const room_service_1 = require("./room.service");
let RoomModule = class RoomModule {
};
RoomModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([room_entity_1.Room, message_entity_1.Message]), user_module_1.UserModule],
        controllers: [room_controller_1.RoomController],
        providers: [room_service_1.RoomService],
        exports: [room_service_1.RoomService],
    })
], RoomModule);
exports.RoomModule = RoomModule;
//# sourceMappingURL=room.module.js.map