import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'

import { GoalLogService } from './goalLog.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

import { GoalLog } from './entities/goalLog.entity'
import { RequestWithUser } from 'src/user/interfaces/reqeust-with-user.interface'

@Controller('goalLog')
export class GoalLogController {
    constructor(private readonly goalLogService: GoalLogService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req: RequestWithUser, @Body() createGoalLogDto) {
        createGoalLogDto.user = req.user

        return this.goalLogService.create(createGoalLogDto)
    }
}
