import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

import { Goal } from 'src/goal/entities/goal.entity'

@Entity('goalLog')
export class GoalLog {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'date' })
    completeDate: Date

    @ManyToOne(() => Goal, goal => goal.goalLogs)
    goal: Goal
}
