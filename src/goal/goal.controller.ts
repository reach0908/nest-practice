import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'

import { GoalService } from './goal.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { OwnershipGuard } from 'src/goal/guards/ownsership.guard'

import { Goal } from './entities/goal.entity'
import { RequestWithUser } from 'src/room/interfaces/request-with-user.interface'

@Controller('goal')
export class GoalController {
    constructor(private readonly goalService: GoalService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: Goal['id']) {
        return this.goalService.getgoal(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return this.goalService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req: RequestWithUser, @Body() createGoalDto: CreateGoalDto) {
        createGoalDto.user = req.user

        return this.goalService.create(createGoalDto)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Req() req: RequestWithUser, @Body() updateGoalDto: UpdateGoalDto) {
        return this.goalService.update(id, updateGoalDto)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.goalService.remove(id)
    }
}
