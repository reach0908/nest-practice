import { SprintSetting } from 'src/sprintSetting/entities/sprintSetting.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RetrospectiveQuestion {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	question: string;

	@Column()
	isEssential: boolean;

	@ManyToOne(
		() => SprintSetting,
		(setting: SprintSetting) => setting.questions
	)
	sprintSetting: SprintSetting;
}
