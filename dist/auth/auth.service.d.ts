import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signUp(userDto: CreateUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signIn(userDto: LoginUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    validateUser(userDto: LoginUserDto): Promise<User>;
    verifyAccessToken(accessToken: string): any;
    verifyRefreshToken(refreshToken: string): any;
    updateAccessTokens(refreshToken: string): Promise<string>;
    private generateTokens;
}
