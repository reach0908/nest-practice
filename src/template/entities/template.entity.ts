import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Question } from 'src/question/entities/question.entity'
import { Answer } from 'src/answer/entity/answer'

@Entity('template')
export class Template {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ default: false })
    isOn: boolean

    @Column({ default: 'sprint' })
    type: 'daily' | 'weekly' | 'sprint'

    @OneToMany(() => Question, question => question.template, { cascade: true })
    questions: Array<Question>

    @OneToMany(() => Answer, answer => answer.template)
    answers: Array<Answer>
}
