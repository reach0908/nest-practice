"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const local_auth_guard_1 = require("./guards/local-auth.guard");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const login_user_dto_1 = require("../user/dto/login-user.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(userDto, res) {
        const tokens = await this.authService.signUp(userDto);
        if (!tokens) {
            throw new common_1.HttpException('User under this username already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return tokens;
    }
    async signIn(userDto, res) {
        const tokens = await this.authService.signIn(userDto);
        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return tokens;
    }
    async updateTokens(req) {
        const { refreshToken } = req.cookies;
        const accessToken = await this.authService.updateAccessTokens(refreshToken);
        if (!accessToken) {
            throw new common_1.HttpException('UnAuthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return accessToken;
    }
};
__decorate([
    (0, common_1.Post)('/signUp'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/signIn'),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateTokens", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map