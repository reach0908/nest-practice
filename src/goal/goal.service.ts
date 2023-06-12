import { Injectable, NotFoundException } from '@nestjs/common'
import { Goal } from './entities/goal.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Sprint } from 'src/sprint/entities/sprint.entity'

@Injectable()
export class GoalService {
    constructor(
        @InjectRepository(Goal)
        private readonly goalRepository: Repository<Goal>,
        @InjectRepository(Sprint)
        private readonly sprintRepository: Repository<Sprint>
    ) {}

    async getgoal(id: Goal['id']) {
        const goal = await this.goalRepository.find({
            where: { id }
        })

        if (!goal) {
            throw new NotFoundException(`Cannot find goal with id ${id}`)
        }

        return goal
    }

    async getGoalsBySprint(sprintId: Sprint['id']) {
        const goals = await this.goalRepository.find({
            where: { sprints: { id: sprintId } },
            relations: ['sprint']
        })

        return goals
    }

    async createGoal(sprintId: Sprint['id'], createGoalDto: CreateGoalDto) {
        const sprint = await this.sprintRepository.findOne({
            where: { id: sprintId },
            relations: ['goals']
        })

        const goal = await this.goalRepository.create({
            ...createGoalDto,
            sprint
        })

        return await this.goalRepository.save(goal)
    }

    async removegoal(id: Goal['id']) {
        const goal = await this.goalRepository.findOne({
            where: { id }
        })

        if (!goal) {
            throw new NotFoundException(`Cannot find goal with id ${id}`)
        }

        return await this.goalRepository.remove(goal)
    }
}
