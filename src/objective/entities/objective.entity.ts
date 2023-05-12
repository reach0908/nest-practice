import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { Sprint } from 'src/sprint/entities/sprint.entity';
import { User } from 'src/user/entities/user.entity';
import { Task } from 'src/task/entities/task.entity';

@Entity()
export class Objective {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	// TODO: 스테이터스 constant에서 관리할 수 있도록
	@Column()
	status: string;

	@ManyToOne(() => User, (user: User) => user.objective)
	user: User;

	@ManyToOne(() => Sprint, (sprint: Sprint) => sprint.objectives);
	sprint:Sprint;

	@OneToMany(
		() => Task,
		(task: Task) => task.objective
	)
	task: Array<Task>;
}
