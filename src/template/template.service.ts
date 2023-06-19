import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Template } from './entities/template.entity'
import { Repository } from 'typeorm'
import { CreateTemplateDto } from './dto/create-template.dto'
import { UpdateTemplateDto } from './dto/update-template.dto'
import { Question } from 'src/question/entities/question.entity'
@Injectable()
export class TemplateService {
    constructor(
        @InjectRepository(Template)
        private readonly templateRepository: Repository<Template>,
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>
    ) {}

    async findAllByUser(user: Template['user']) {
        const templates = await this.templateRepository.findBy({ user })

        return templates
    }

    async findOne(id: Template['id']) {
        const template = await this.templateRepository.findOneBy({ id })

        if (!template) {
            throw new NotFoundException(`There is no template with id ${id}`)
        }

        return template
    }

    async create(createTemplateDto: CreateTemplateDto) {
        const questionInfos = await this.questionRepository
            .createQueryBuilder()
            .where('id IN (:id)', { id: createTemplateDto.questions })
            .getMany()

        const template = this.templateRepository.create({
            ...createTemplateDto,
            questions: questionInfos
        })

        return this.templateRepository.save(template)
    }

    async update(id: Template['id'], updateTemplateDto: UpdateTemplateDto) {
        const template = await this.templateRepository.preload({
            id,
            ...updateTemplateDto
        })

        if (!template) {
            throw new NotFoundException(`Template with id ${id} is not found`)
        }

        return this.templateRepository.save(template)
    }

    async remove(id: Template['id']) {
        const template = await this.templateRepository.findOneBy({ id })
        return this.templateRepository.remove(template)
    }
}
