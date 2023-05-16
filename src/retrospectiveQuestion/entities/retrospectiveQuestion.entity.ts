import { RetrospectiveAnswer } from 'src/retrospectiveAnswer/entity/retrospectiveAnswer.entity'
import { SprintSetting } from 'src/sprintSetting/entities/sprintSetting.entity'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class RetrospectiveQuestion {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    question: string

    @Column()
    isEssential: boolean

    // 현재 세팅에 포함되어 있는 질문들인지
    @ManyToOne(() => SprintSetting, (setting: SprintSetting) => setting.questions)
    sprintSetting: SprintSetting

    // 해당 질문에 응답된 답변들
    @OneToMany(() => RetrospectiveAnswer, (answer: RetrospectiveAnswer) => answer.question)
    answers: Array<RetrospectiveAnswer>
}
