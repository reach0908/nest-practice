import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinTable,
	OneToMany,
	ManyToMany,
} from 'typeorm';

import { Room } from 'src/room/entities/room.entity';
import { Message } from 'src/room/entities/message.entity';
import { Sprint } from 'src/sprint/entities/sprint.entity';
import { Objective } from 'src/objective/entities/objective.entity';
import { Task } from 'src/task/entities/task.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ length: 20 })
	username: string;

	@Column({ length: 60 })
	password: string;

	@Column()
	avatar: string;

	@Column()
	is_admin: boolean;

	@JoinTable()
	@ManyToOne(() => Room, (room: Room) => room.users)
	room: Room;

	@JoinTable()
	@ManyToMany(() => Room, (room: Room) => room.bannedUsers, {
		eager: true,
	})
	bannedRooms: Array<Room>;

	@OneToMany(() => Message, (message: Message) => message.user)
	messages: Array<Message>;

	// 유저 입장에서 유저에게는 스프린트가 여러개 있음
	@OneToMany(() => Sprint, (sprint: Sprint) => sprint.user)
	sprint: Array<Sprint>;

	@OneToMany(() => Objective, (objective: Objective) => objective.user)
	objective: Array<Objective>;

	@OneToMany(() => Task, (task: Task) => task.user)
	task: Array<Task>;
}
