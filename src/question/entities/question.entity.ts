import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Template } from 'src/template/entities/template.entity'

@Entity('question')
export class Question {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    question: string

    @ManyToOne(() => Template, template => template.questions)
    template: Template
}
