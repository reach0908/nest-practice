import { Column, Entity, OneToMany, OneToOne,CreateDateColumn } from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import {RetrospectiveQuestion} 'src/retrospectiveQuestion/entities/retrospectiveQuestion.entity'

@Entity()
export class SprintSetting {
	@OneToOne(() => User, (user: User) => user.sprintSetting)
	user: User;

	// SprintSetting을 지우는 경우 연결된 질문들도 모두 지운다. 
	@OneToMany(()=>RetrospectiveQuestion, (question: RetrospectiveQuestion)=>question.sprintSetting)
	questions:Array<RetrospectiveQuestion>

	// 스프린트의 주기를 정함, 최소값은 1
	@Column()
	cycle: number;

	// 스프린트를 초기화하는 경우에는 해당 세팅을 지우고 새로 만든다.
	// createDate는 유저가 스프린트를 처음으로 시작하게 되는 날짜와 동일
	@CreateDateColumn()
	createdDate: Date;
}
