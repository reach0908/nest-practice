import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Answer } from './entity/answer.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private readonly answerRepository: Repository<Answer>
    ) {}

    async findAll() {
        const answers = await this.answerRepository.find({})

        return answers
    }

    async findOne(id: Answer['id']) {
        const answer = await this.answerRepository.findOneBy({ id })

        if (!answer) {
            throw new NotFoundException(`There is no spirnt under id ${id}`)
        }

        return answer
    }

    async create(createAnswerDto: CreateAnswerDto) {
        const answer = await this.answerRepository.create({ ...createAnswerDto })

        return this.answerRepository.save(answer)
    }

    async update(id: Answer['id'], updateAnswerDto: UpdateAnswerDto) {
        const answer = await this.answerRepository.preload({
            id,
            ...updateAnswerDto
        })

        if (!answer) {
            throw new NotFoundException(`There is no spirnt under id ${id}`)
        }

        return this.answerRepository.save(answer)
    }

    async remove(id: Answer['id']) {
        const answer = await this.findOne(id)
        return this.answerRepository.remove(answer)
    }
}
