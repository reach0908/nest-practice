import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Question } from './entities/question.entity'
import { Repository } from 'typeorm'

import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>
    ) {}

    async findOne(id: Question['id']) {
        const question = await this.questionRepository.findOneBy({ id })

        if (!question) {
            throw new NotFoundException(`There is no question under id ${id}}`)
        }

        return question
    }

    async create(createQuestionDto: CreateQuestionDto) {
        const question = await this.questionRepository.create({
            ...createQuestionDto
        })

        return this.questionRepository.save(question)
    }

    async update(id: Question['id'], updateQuestionDto: UpdateQuestionDto) {
        const question = await this.questionRepository.preload({
            id,
            ...updateQuestionDto
        })

        if (!question) {
            throw new NotFoundException(`There is no question under id ${id}`)
        }

        return this.questionRepository.save(question)
    }

    async remove(id: Question['id']) {
        const question = await this.findOne(id)

        return this.questionRepository.remove(question)
    }
}
