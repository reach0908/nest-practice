import { Sprint } from 'src/sprint/entities/sprint.entity'
import { Template } from 'src/template/entities/template.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 20 })
    username: string

    @Column({ length: 60 })
    password: string

    @Column()
    avatar: string

    @Column()
    is_admin: boolean

    @OneToMany(() => Sprint, sprint => sprint.user)
    sprints: Array<Sprint>

    @OneToMany(() => Sprint, template => template.user)
    templates: Array<Template>
}
