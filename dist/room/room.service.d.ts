import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { Room } from './entities/room.entity';
import { Message } from './entities/message.entity';
import { AddMessageDto } from 'src/chat/dto/add-message.dto';
import { CreateRoomDto } from 'src/room/dto/create-room.dto';
import { UpdateRoomDto } from 'src/room/dto/update-room.dto';
import { BanUserDto } from 'src/chat/dto/ban-user.dto';
export declare class RoomService {
    private readonly roomRepository;
    private readonly messageRepository;
    private readonly userService;
    constructor(roomRepository: Repository<Room>, messageRepository: Repository<Message>, userService: UserService);
    findAll(): Promise<Room[]>;
    findOne(id: string): Promise<Room>;
    findOneWithRelations(id: string): Promise<Room>;
    findOneByName(name: string): Promise<Room>;
    create(createRoomDto: CreateRoomDto): Promise<Room>;
    addMessage(addMessageDto: AddMessageDto): Promise<Message>;
    update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room>;
    banUserFromRoom(banUserDto: BanUserDto): Promise<Room>;
    remove(id: string): Promise<Room>;
}
