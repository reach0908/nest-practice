import { User } from 'src/user/entities/user.entity';
import { Message } from './message.entity';
export declare class Room {
    id: string;
    name: string;
    description: string;
    avatar: string;
    ownerId: string;
    users: Array<User>;
    bannedUsers: Array<User>;
    messages: Array<Message>;
}
