import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Goal } from 'src/goal/entities/goal.entity'
import { Repository } from 'typeorm'
import { GoalLog } from './entities/goalLog.entity'

@Injectable()
export class GoalLogService {
    constructor(
        @InjectRepository(Goal)
        private readonly goalRepository: Repository<Goal>,
        @InjectRepository(GoalLog)
        private readonly goalLogRepository: Repository<GoalLog>
    ) {}

    async create(createGoalLogDto: CreateGoalLogDto) {
        const goal = await this.goalRepository.find({ id: createGoalLogDto.goalId })

        if (!goal) {
            throw new NotFoundException(`Cannot find goal with id ${id}`)
        }

        const goalLog = await this.goalLogRepository.create({
            ...createGoalLogDto,
            goal
        })

        return await this.goalLogRepository.save(goalLog)
    }
}
