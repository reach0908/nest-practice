import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { Question } from './entities/question.entity'
import { RequestWithUser } from 'src/user/interfaces/reqeust-with-user.interface'

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QeustionService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: Question['id']) {
        return this.questionService.findOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req: RequestWithUser, @Body() createQuestionDto: CreateQuestionDto) {
        createQuestionDto.user = req.user

        return this.questionService.create(createQuestionDto)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Patch(':id')
    async update(@Param('id') id: Question['id'], @Body() updateQuestionDto: UpdateQuestionDto) {
        return this.questionService.update(id, updateQuestionDto)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @Delete(':id')
    async remove(@Param('id') id: Question['id']) {
        return this.questionService.remove(id)
    }
}
