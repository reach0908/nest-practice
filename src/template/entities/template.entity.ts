import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

import { Question } from 'src/question/entities/question.entity'
import { User } from 'src/user/entities/user.entity'
import { Sprint } from 'src/sprint/entities/sprint.entity'

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

    @OneToMany(() => Sprint, sprint => sprint.template)
    sprints: Array<Sprint>

    @ManyToOne(() => User, user => user.templates)
    user: User
}
