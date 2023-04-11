import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(userDto: CreateUserDto, res: Response): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signIn(userDto: LoginUserDto, res: Response): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    updateTokens(req: Request): Promise<string>;
}
