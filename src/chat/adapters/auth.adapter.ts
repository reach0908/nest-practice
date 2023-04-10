import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

export class AuthIoAdapter extends IoAdapter {
	private readonly authService: AuthService;
	private readonly userService: UserService;

	constructor(app: INestApplicationContext) {
		super(app);
		this.authService = app.get(AuthService);
		this.userService = app.get(UserService);
	}

	createIOServer(port: number, options?: any): any {
		options.allowRequest = async (request, allowFunction) => {
			const token = request._query?.token;

			const isVerfied =
				token && (await this.authService.verifyAccessToken(token));
			const userExists =
				isVerfied && (await this.userService.findOne(isVerfied.id));

			if (isVerfied && userExists) {
				return allowFunction(null, true);
			}

			return allowFunction('Unauthorized', false);
		};
	}
}
