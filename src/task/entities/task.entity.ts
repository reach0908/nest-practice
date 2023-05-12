import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
} from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { Objective } from 'src/objective/entities/objective.entity';

// 데이터 테이블에 매핑되는 클래스
// 아래 데코레이터를 통해 적용해서 생성할 수 있음
@Entity()
export class Task {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	startDate: Date;

	@Column()
	endDate: Date;

	@OneToMany(() => Objective, (objective: Objective) => objective.task)
	objective: Objective;

	@ManyToOne(() => User, (user: User) => user.task)
	user: User;
}
