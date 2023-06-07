import { Controller, UseGuards, Get, Post, Req, Body, Patch, Param, Delete } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { OwnershipGuard } from 'src/sprint/guards/ownership.guard'

import { RequestWithUser } from 'src/user/interfaces/reqeust-with-user.interface'

@Controller('anwer')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return this.answerService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req: RequestWithUser, @Body() createAnswerDto: CreateAnswerDto) {
        createAnswerDto.user = req.user

        return this.answerService.create(createAnswerDto)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Req req: RequestWithUser, @Body updateAnswerDto: UpdateAnswerDto) {
        return this.answerService.update(id, updateAnswerDto)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.answerService.remove(id)
    }
}
