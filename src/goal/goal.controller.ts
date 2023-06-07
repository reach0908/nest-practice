import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'

import { ObjectiveService } from './goal.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

import { Objective } from './entities/goal.entity'
import { RequestWithUser } from 'src/room/interfaces/request-with-user.interface'
import { CreateTaskDto } from 'src/task/dto/create-task.dto'

@Controller('objective')
export class ObjectiveController {
    constructor(private readonly objectiveService: ObjectiveService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: Objective['id']) {
        return this.objectiveService.getObjective(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return this.objectiveService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req: RequestWithUser, @Body() createTaskDto: CreateTaskDto) {
        createTaskDto.user = req.user

        return this.objectiveService.create(createTaskDto)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Req() req: RequestWithUser, @Body() updateSprintDto: UpdateSprintDto) {
        return this.sprintService.update(id, updateSprintDto)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.sprintService.remove(id)
    }
}
