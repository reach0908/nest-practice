import { Body, Controller, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common'

import { Request, Response } from 'express'

import { AuthService } from './auth.service'

import { LocalAuthGuard } from './guards/local-auth.guard'

import { CreateUserDto } from '../user/dto/create-user.dto'
import { LoginUserDto } from '../user/dto/login-user.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signUp')
    async signUp(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
        const tokens = await this.authService.signUp(userDto)

        if (!tokens) {
            throw new HttpException('User under this username already exists', HttpStatus.BAD_REQUEST)
        }

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        return tokens
    }

    @Post('/signIn')
    @UseGuards(LocalAuthGuard)
    async signIn(@Body() userDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
        const tokens = await this.authService.signIn(userDto)

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        return tokens
    }

    @Post('/update')
    async updateTokens(@Req() req: Request) {
        const { refreshToken } = req.cookies

        const accessToken = await this.authService.updateAccessTokens(refreshToken)

        if (!accessToken) {
            throw new HttpException('UnAuthorized', HttpStatus.UNAUTHORIZED)
        }

        return accessToken
    }
}
