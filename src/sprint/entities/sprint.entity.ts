import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from 'src/user/entities/user.entity';

// 데이터 테이블에 매핑되는 클래스
// 아래 데코레이터를 통해 적용해서 생성할 수 있음
@Entity()
export class Sprint {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ length: 20 })
	sprintName: string;

	@Column()
	startDate: Date;

	@Column()
	endDate: Date;

	@Column()
	sprintNumber: number;

	@Column()
	active: boolean;

	// 스프린트의 입장에서 하나에 여러개가 연결됨
	@ManyToOne(() => User, (user: User) => user.sprint)
	user: User;
}
