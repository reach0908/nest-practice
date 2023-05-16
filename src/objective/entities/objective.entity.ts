import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'

import { Sprint } from 'src/sprint/entities/sprint.entity'
import { User } from 'src/user/entities/user.entity'
import { Task } from 'src/task/entities/task.entity'

@Entity('objective')
export class Objective {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @ManyToOne(() => User, (user: User) => user.objective)
    user: User

    @ManyToOne(() => Sprint, (sprint: Sprint) => sprint.objectives)
    sprint: Sprint

    @OneToMany(() => Task, (task: Task) => task.objective)
    task: Array<Task>
}
