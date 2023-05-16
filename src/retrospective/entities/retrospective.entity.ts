import { Sprint } from 'src/sprint/entities/sprint.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Retrospective {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	score: number;

	@Column()
	description: string;

	// TODO: sprintSetting의 질문리스트 연결하기
	@Column()
	questionAnswers: Array<Object>;

	@OneToOne(() => Sprint, (sprint: Sprint) => sprint.retrospective)
	sprint: Sprint;
}
