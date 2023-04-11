"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthIoAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const auth_service_1 = require("../../auth/auth.service");
const user_service_1 = require("../../user/user.service");
class AuthIoAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app) {
        super(app);
        this.app = app;
        this.authService = this.app.get(auth_service_1.AuthService);
        this.userService = this.app.get(user_service_1.UserService);
    }
    createIOServer(port, options) {
        options.allowRequest = async (request, allowFunction) => {
            var _a;
            const token = (_a = request._query) === null || _a === void 0 ? void 0 : _a.token;
            const isVerfied = token &&
                (await this.authService.verifyAccessToken(token));
            const userExists = isVerfied &&
                (await this.userService.findOne(isVerfied.id));
            if (isVerfied && userExists) {
                return allowFunction(null, true);
            }
            return allowFunction('Unauthorized', false);
        };
    }
}
exports.AuthIoAdapter = AuthIoAdapter;
//# sourceMappingURL=auth.adapter.js.map