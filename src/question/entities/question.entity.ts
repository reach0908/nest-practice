import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Template } from 'src/template/entities/template.entity'
import { Answer } from 'src/answer/entity/answer.entity'

@Entity('question')
export class Question {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    question: string

    @ManyToOne(() => Template, template => template.questions)
    template: Template

    @OneToMany(() => Answer, answer => answer.questions)
    answers: Array<Answer>
}
