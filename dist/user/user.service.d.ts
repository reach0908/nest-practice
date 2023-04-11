import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Room } from 'src/room/entities/room.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByUsername(username: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    updateUserRoom(id: string, room: Room): Promise<User>;
    remove(id: string): Promise<User>;
}
