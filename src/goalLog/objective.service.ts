import { Injectable, NotFoundException } from '@nestjs/common'
import { Objective } from './entities/goalLog.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Sprint } from 'src/sprint/entities/sprint.entity'
import { CreateObjectiveDto } from 'src/goal/dto/create-objective.dto'

@Injectable()
export class ObjectiveService {
    constructor(
        @InjectRepository(Objective)
        private readonly objectiveRepository: Repository<Objective>,
        @InjectRepository(Sprint)
        private readonly sprintRepository: Repository<Sprint>
    ) {}

    async getObjective(id: Objective['id']) {
        const objective = await this.objectiveRepository.find({
            where: { id }
        })

        if (!objective) {
            throw new NotFoundException(`Cannot find objective with id ${id}`)
        }

        return objective
    }

    async getObjectivesBySprint(sprintId: Sprint['id']) {
        const objectives = await this.objectiveRepository.find({
            where: { sprint: { id: sprintId } },
            relations: ['sprint']
        })

        return objectives
    }

    async creatObjective(sprintId: Sprint['id'], createObjectiveDto: CreateObjectiveDto) {
        const sprint = await this.sprintRepository.findOne({
            where: { id: sprintId },
            relations: ['objectives']
        })

        const objective = await this.objectiveRepository.create({
            ...createObjectiveDto,
            sprint
        })

        return await this.objectiveRepository.save(objective)
    }

    async removeObjective(id: Objective['id']) {
        const objective = await this.objectiveRepository.findOne({
            where: { id }
        })

        if (!objective) {
            throw new NotFoundException(`Cannot find objective with id ${id}`)
        }

        return await this.objectiveRepository.remove(objective)
    }
}
