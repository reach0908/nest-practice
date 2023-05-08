import {
	IsBoolean,
	IsString,
	IsDate,
	IsNotEmpty,
	IsNumber,
} from 'class-validator';

export class CreateSprintDto {
	@IsString()
	readonly sprintName: string;

	@IsNotEmpty()
	@IsDate()
	readonly startDate: string;

	@IsNotEmpty()
	@IsDate()
	readonly endDate: string;

	@IsNumber()
	readonly sprintNumber: number;
}
