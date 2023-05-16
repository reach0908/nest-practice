import { RetrospectiveQuestion } from 'src/retrospectiveQuestion/entities/retrospectiveQuestion.entity'
import { Sprint } from 'src/sprint/entities/sprint.entity'
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
interface QuestionWithAnswer extends RetrospectiveQuestion {
    answer: string
}

@Entity()
export class Retrospective {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    score: number

    // 이번 스프린트의 소감
    @Column()
    description: string

    // TODO: sprintSetting의 질문리스트 연결하기
    @Column()
    answers: Array<QuestionWithAnswer>

    @OneToOne(() => Sprint, (sprint: Sprint) => sprint.retrospective)
    sprint: Sprint
}
