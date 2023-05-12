import {
	IsBoolean,
	IsDate,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

import { Sprint } from '../entities/sprint.entity';

export class UpdateSprintDto {
	@IsString()
	@IsOptional()
	readonly name?: Sprint['name'];

	@IsString()
	@IsOptional()
	readonly description?: Sprint['description'];

	@IsBoolean()
	@IsOptional()
	readonly active?: Sprint['active'];

	@IsNumber()
	@IsOptional()
	readonly sprintNumber?: Sprint['sprintNumber'];

	@IsDate()
	@IsOptional()
	readonly startDate?: Sprint['startDate'];

	@IsDate()
	@IsOptional()
	readonly endDate?: Sprint['endDate'];
}
