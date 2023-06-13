import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm'

import { Sprint } from 'src/sprint/entities/sprint.entity'
import { GoalLog } from 'src/goalLog/entities/goalLog.entity'

@Entity('goal')
export class Goal {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: 'sprint' })
    type: 'daily' | 'weekly' | 'sprint'

    @Column()
    name: string

    @Column()
    description: string

    @Column({ default: false })
    isComplete: false

    @ManyToMany(() => Sprint, sprint => sprint.goals)
    @JoinTable()
    sprints: Array<Sprint>

    @OneToMany(() => GoalLog, goalLog => goalLog.goal, { cascade: true })
    goalLogs: Array<GoalLog>
}
