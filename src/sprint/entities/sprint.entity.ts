import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne
} from 'typeorm'

import { User } from 'src/user/entities/user.entity'
import { Objective } from 'src/goal/entities/objective.entity'
import { Retrospective } from 'src/retrospective/entities/retrospective.entity'

// 데이터 테이블에 매핑되는 클래스
// 아래 데코레이터를 통해 적용해서 생성할 수 있음
@Entity()
export class Sprint {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @Column()
    sprintNumber: number

    @Column()
    active: boolean

    // 스프린트의 입장에서 하나에 여러개가 연결됨
    @ManyToOne(() => User, (user: User) => user.sprint)
    user: User

    @OneToMany(() => Objective, objective => objective.sprint, {
        cascade: true
    })
    objectives: Array<Objective>

    @OneToOne(() => Retrospective, (retrospective: Retrospective) => retrospective.sprint)
    retrospective: Retrospective
}
