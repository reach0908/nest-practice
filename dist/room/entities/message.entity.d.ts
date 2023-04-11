import { User } from 'src/user/entities/user.entity';
import { Room } from './room.entity';
export declare class Message {
    id: string;
    text: string;
    created_at: Date;
    room: Room;
    user: User;
}
