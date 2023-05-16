import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToOne } from 'typeorm'

import { Retrospective } from 'src/retrospective/entities/retrospective.entity'
import { RetrospectiveQuestion } from 'src/retrospectiveQuestion/entities/retrospectiveQuestion.entity'

@Entity()
export class RetrospectiveAnswer {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    answer: string

    @ManyToOne(() => Retrospective, (retrospecitve: Retrospective) => retrospecitve.answers)
    retrospective: Retrospective

    @OneToOne(() => RetrospectiveQuestion, (question: RetrospectiveQuestion) => question.answers)
    question: RetrospectiveQuestion
}
