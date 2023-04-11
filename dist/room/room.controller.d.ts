import { RequestWithUser } from './interfaces/request-with-user.interface';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomService } from './room.service';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    findOne(id: string): Promise<import("./entities/room.entity").Room>;
    find(): Promise<import("./entities/room.entity").Room[]>;
    create(req: RequestWithUser, createRoomDto: CreateRoomDto): Promise<import("./entities/room.entity").Room>;
    update(id: string, req: RequestWithUser, updateRoomDto: UpdateRoomDto): Promise<import("./entities/room.entity").Room>;
    remove(id: string): Promise<import("./entities/room.entity").Room>;
}
