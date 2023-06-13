import { Injectable, NotFoundException } from '@nestjs/common'
import { Goal } from './entities/goal.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Sprint } from 'src/sprint/entities/sprint.entity'
import { GoalLog } from 'src/goalLog/entities/goalLog.entity'

@Injectable()
export class GoalService {
    constructor(
        @InjectRepository(Goal)
        private readonly goalRepository: Repository<Goal>,
        @InjectRepository(Sprint)
        private readonly sprintRepository: Repository<Sprint>,
        @InjectRepository(GoalLog)
        private readonly goalLogRepository: Repository<GoalLog>
    ) {}

    async get(id: Goal['id']) {
        const goal = await this.goalRepository.find({
            where: { id }
        })

        const goalLogs = await this.goalLogRepository.find({
            where: { goal }
        })

        if (!goal) {
            throw new NotFoundException(`Cannot find goal with id ${id}`)
        }

        return { ...goal, logs: goalLogs }
    }

    async create(createGoalDto: CreateGoalDto) {
        const sprint = await this.sprintRepository.findOne({
            where: { id: createGoalDto.sprintId },
            relations: ['goals']
        })

        const goal = this.goalRepository.create({
            ...createGoalDto,
            sprint
        })

        return await this.goalRepository.save(goal)
    }

    async update(goalId: Goal['id'], updateGoalDto: UpdateGoalDto) {
        const goal = await this.goalRepository.preload({ id, ...updateGoalDto })

        if (!goal) {
            throw new NotFoundException(`Cannot find goal with id ${goalId}`)
        }

        return this.goalRepository.save(goal)
    }

    async remove(id: Goal['id']) {
        const goal = await this.goalRepository.findOne({
            where: { id }
        })

        if (!goal) {
            throw new NotFoundException(`Cannot find goal with id ${id}`)
        }

        return await this.goalRepository.remove(goal)
    }
}
