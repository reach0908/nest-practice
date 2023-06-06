import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Template } from 'src/template/entities/template.entity'
import { Sprint } from 'src/sprint/entities/sprint.entity'

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    question: string

    @Column()
    response: string

    @Column({ type: 'date' })
    date: Date

    @ManyToOne(() => Template, template => template.answers)
    template: Template

    @ManyToOne(() => Sprint, sprint => sprint.answers)
    sprint: Sprint
}
