import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { Sprint } from 'src/sprint/entities/sprint.entity'
import { CreateSprintDto } from 'src/sprint/dto/create-sprint.dto'
import { UpdateSprintDto } from './dto/update-sprint.dto'

@Injectable()
export class SprintService {
    constructor(
        @InjectRepository(Sprint)
        private readonly sprintRepository: Repository<Sprint>
    ) {}

    async findAll() {
        const sprints = await this.sprintRepository.find({
            relations: ['objectives']
        })

        return sprints
    }

    async findOne(id: Sprint['id']) {
        const sprint = await this.sprintRepository.findOneBy({ id })

        if (!sprint) {
            throw new NotFoundException(`There is no sprint under id ${id}`)
        }

        return sprint
    }

    async create(createSprintDto: CreateSprintDto) {
        const sprint = await this.sprintRepository.create({
            ...createSprintDto
        })

        return this.sprintRepository.save(sprint)
    }

    async update(id: Sprint['id'], updateSprintDto: UpdateSprintDto) {
        const sprint = await this.sprintRepository.preload({
            id,
            ...updateSprintDto
        })

        if (!sprint) {
            throw new NotFoundException(`Sprint with id ${id} not found`)
        }

        return this.sprintRepository.save(sprint)
    }

    async remove(id: Sprint['id']) {
        const sprint = await this.findOne(id)
        return this.sprintRepository.remove(sprint)
    }
}
