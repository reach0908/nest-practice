import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'

import { User } from 'src/user/entities/user.entity'
import { Objective } from 'src/goal/entities/objective.entity'

// 데이터 테이블에 매핑되는 클래스
// 아래 데코레이터를 통해 적용해서 생성할 수 있음
@Entity('task')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @ManyToOne(() => User, (user: User) => user.task)
    user: User

    @Column()
    status: string

    @OneToMany(() => Objective, (objective: Objective) => objective.task)
    objective: Objective
}
