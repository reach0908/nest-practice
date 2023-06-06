import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Answer } from 'src/answer/entity/answer'
import { Goal } from 'src/goal/entities/goal.entity'

// 데이터 테이블에 매핑되는 클래스
// 아래 데코레이터를 통해 적용해서 생성할 수 있음
@Entity()
export class Sprint {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    term: number

    @Column({ default: false })
    isComplete: boolean

    @OneToMany(() => Answer, answer => answer.sprint)
    answers: Array<Answer>

    @Column()
    goals: Array<Goal>

    @Column({ type: 'date' })
    @CreateDateColumn()
    createdDate: Date

    @Column({ type: 'date' })
    @UpdateDateColumn()
    updatedDate: Date
}
