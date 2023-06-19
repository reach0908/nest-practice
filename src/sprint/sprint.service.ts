import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { Sprint } from 'src/sprint/entities/sprint.entity'
import { CreateSprintDto } from 'src/sprint/dto/create-sprint.dto'
import { UpdateSprintDto } from './dto/update-sprint.dto'
import { Goal } from 'src/goal/entities/goal.entity'
import { Answer } from 'src/answer/entity/answer.entity'

@Injectable()
export class SprintService {
    constructor(
        @InjectRepository(Sprint)
        private readonly sprintRepository: Repository<Sprint>,
        @InjectRepository(Goal)
        private readonly goalRepository: Repository<Goal>,
        @InjectRepository(Answer)
        private readonly answerRepository: Repository<Answer>
    ) {}

    async get(id: Sprint['id']) {
        const sprint = await this.sprintRepository.findOneBy({ id })

        if (!sprint) {
            throw new NotFoundException(`There is no sprint under id ${id}`)
        }

        return sprint
    }

    async getGoalsBySprint(id: Sprint['id']) {
        const sprint = await this.sprintRepository.findOneBy({ id })

        if (!sprint) {
            throw new NotFoundException(`There is no sprint under id ${id}`)
        }

        const goals = await this.goalRepository.find({
            relations: ['sprints'], // sprints 관계를 로드합니다.
            where: {
                sprints: {
                    id: sprint.id // 특정 sprint의 ID를 지정합니다.
                }
            }
        })

        return goals
    }

    async getAnswersBySprint(id: Sprint['id']) {
        const sprint = await this.sprintRepository.findOneBy({ id })

        if (!sprint) {
            throw new NotFoundException(`There is no sprint under id ${id}`)
        }

        const answers = await this.answerRepository.find({
            where: {
                sprint: {
                    id: sprint.id
                }
            }
        })

        return answers
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
        const sprint = await this.sprintRepository.findOneBy({ id })
        return this.sprintRepository.remove(sprint)
    }
}
