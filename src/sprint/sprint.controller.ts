import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'

import { SprintService } from './sprint.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

import { Sprint } from './entities/sprint.entity'
import { OwnershipGuard } from './guards/ownership.guard'
import { CreateSprintDto } from './dto/create-sprint.dto'
import { UpdateSprintDto } from './dto/update-sprint.dto'

import { RequestWithUser } from 'src/user/interfaces/reqeust-with-user.interface'
@Controller('sprint')
export class SprintController {
    constructor(private readonly sprintService: SprintService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: Sprint['id']) {
        return this.sprintService.findOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return this.sprintService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req: RequestWithUser, @Body() createSrpintDto: CreateSprintDto) {
        createSrpintDto.user = req.user

        return this.sprintService.create(createSrpintDto)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Patch(':id')
    async update(@Param('id') id: Sprint['id'], @Body() updateSprintDto: UpdateSprintDto) {
        return this.sprintService.update(id, updateSprintDto)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Delete(':id')
    async remove(@Param('id') id: Sprint['id']) {
        return this.sprintService.remove(id)
    }
}
