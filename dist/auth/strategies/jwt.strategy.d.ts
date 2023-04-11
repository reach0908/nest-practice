import { UserService } from 'src/user/user.service';
import { JwtPayload } from 'src/auth/strategies/interfaces/jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(payload: JwtPayload): Promise<import("../../user/entities/user.entity").User>;
}
export {};
