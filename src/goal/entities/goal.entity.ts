import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'

import { Sprint } from 'src/sprint/entities/sprint.entity'

@Entity('objective')
export class Goal {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    score: number

    @ManyToMany(() => Sprint, sprint => sprint.goals)
    sprints: Array<Sprint>
}
