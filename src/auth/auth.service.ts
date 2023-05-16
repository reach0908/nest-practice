import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import * as bycrypt from 'bcrypt'

import { UserService } from '../user/user.service'

import { User } from 'src/user/entities/user.entity'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { LoginUserDto } from 'src/user/dto/login-user.dto'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async signUp(userDto: CreateUserDto) {
        const candidate = await this.userService.findByUsername(userDto.username)

        if (candidate) {
            return null
        }

        const hashedPassword = await bycrypt.hash(userDto.password, 7)
        const user = await this.userService.create({
            ...userDto,
            password: hashedPassword
        })

        const tokens = await this.generateTokens(user.id)

        return tokens
    }

    async signIn(userDto: LoginUserDto) {
        const user = await this.userService.findByUsername(userDto.username)

        const tokens = await this.generateTokens(user.id)

        return tokens
    }

    async validateUser(userDto: LoginUserDto): Promise<User> {
        const user = await this.userService.findByUsername(userDto.username)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const passwordEquals = await bycrypt.compare(userDto.password, user.password)

        if (passwordEquals) {
            return user
        }

        throw new UnauthorizedException({ message: 'Invalid password' })
    }

    verifyAccessToken(accessToken: string) {
        try {
            const payload = this.jwtService.verify(accessToken, {
                secret: process.env.JWT_ACCESS_SECRET
            })

            return payload
        } catch (err) {
            return null
        }
    }

    verifyRefreshToken(refreshToken: string) {
        const payload = this.jwtService.verify(refreshToken, {
            secret: process.env.JWT_REFRESH_SECRET
        })
        return payload
    }

    async updateAccessTokens(refreshToken: string) {
        try {
            const userId = this.verifyRefreshToken(refreshToken)

            const tokens = await this.generateTokens(userId)

            return tokens.accessToken
        } catch (err) {
            return null
        }
    }

    private async generateTokens(id: string) {
        const payload = { id }

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.JWT_ACCESS_EXPIRE
        })

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRE
        })

        const tokens = { accessToken, refreshToken }

        return tokens
    }
}
