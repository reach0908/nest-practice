import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Sprint } from 'src/sprint/entities/sprint.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Objective {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	sprintId: Sprint['id'];

	// TODO: 스테이터스 constant에서 관리할 수 있도록
	@Column()
	status: string;

	@ManyToOne(() => User, (user: User) => user.objective)
	user: User;
}
