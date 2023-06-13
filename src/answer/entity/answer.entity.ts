import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Sprint } from 'src/sprint/entities/sprint.entity'
import { Question } from 'src/question/entities/question.entity'

@Entity('answer')
export class Answer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    response: string

    @Column({ type: 'date' })
    date: Date

    @ManyToOne(() => Sprint, sprint => sprint.answers)
    sprint: Sprint

    @ManyToOne(() => Question, question => question.answers)
    question: Question
}
