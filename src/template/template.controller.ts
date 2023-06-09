import { Controller, UseGuards, Get, Param, Body, Post, Req, Patch, Delete } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { RequestWithUser } from 'src/user/interfaces/reqeust-with-user.interface'
import { Template } from './entities/template.entity'
import { OwnershipGuard } from 'src/sprint/guards/ownership.guard'
import { TemplateService } from './template.service'
import { CreateTemplateDto } from './dto/create-template.dto'
import { UpdateTemplateDto } from './dto/update-template.dto'

@Controller('template')
export class TemplateController {
    constructor(private readonly templateService: TemplateService) {}

    // 내가 만든 모든 템플릿 확인
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllByUser(req: RequestWithUser) {
        const { user } = req
        return this.templateService.findAllByUser(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: Template['id']) {
        return this.templateService.findOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req: RequestWithUser, @Body() createTemplateDto: CreateTemplateDto) {
        createTemplateDto.user = req.user

        return this.templateService.create(createTemplateDto)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Patch(':id')
    async update(@Param('id') id: Template['id'], @Body() updateTemplateDto: UpdateTemplateDto) {
        return this.templateService.update(id, updateTemplateDto)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Delete(':id')
    async remove(@Param('id') id: Template['id']) {
        return this.templateService.remove(id)
    }
}
