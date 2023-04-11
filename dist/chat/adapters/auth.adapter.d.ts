import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
export declare class AuthIoAdapter extends IoAdapter {
    private app;
    private readonly authService;
    private readonly userService;
    constructor(app: INestApplicationContext);
    createIOServer(port: number, options?: any): any;
}
