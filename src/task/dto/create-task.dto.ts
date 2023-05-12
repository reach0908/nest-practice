import {
	IsBoolean,
	IsString,
	IsDate,
	IsNotEmpty,
	IsNumber,
} from 'class-validator';
import { ManyToOne } from 'typeorm';

import { User } from 'src/user/entities/user.entity';

export class CreateTaskDto {
	@IsString()
	readonly name: string;

	@IsNotEmpty()
	@IsDate()
	readonly startDate: string;

	@IsNotEmpty()
	@IsDate()
	readonly endDate: string;
}
