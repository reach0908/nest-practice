import { Room } from 'src/room/entities/room.entity';
import { Message } from 'src/room/entities/message.entity';
export declare class User {
    id: string;
    username: string;
    password: string;
    avatar: string;
    is_admin: boolean;
    room: Room;
    bannedRooms: Array<Room>;
    messages: Array<Message>;
}
