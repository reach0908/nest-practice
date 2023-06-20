import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Template } from 'src/template/entities/template.entity'
import { Answer } from 'src/answer/entity/answer.entity'
import { User } from 'src/user/entities/user.entity'

@Entity('question')
export class Question {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    question: string

    @ManyToOne(() => Template, template => template.questions)
    template: Template

    @OneToMany(() => Answer, answer => answer.question)
    answers: Array<Answer>

    @ManyToOne(() => User, user => user.questions)
    user: User
}
