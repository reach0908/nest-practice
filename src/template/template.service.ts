import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Template } from './entities/template.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TemplateService {
    constructor(
        @InjectRepository(Template)
        private readonly templateRepository: Repository<Template>
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
        const template = await this.templateRepository.create({
            ...createTemplateDto
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
}
