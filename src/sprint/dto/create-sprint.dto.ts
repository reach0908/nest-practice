import { IsOptional, IsString, IsDate, IsNotEmpty, IsNumber } from 'class-validator'

import { Sprint } from '../entities/sprint.entity'

export class CreateSprintDto {
    @IsString()
    readonly name: Sprint['name']

    @IsString()
    @IsOptional()
    readonly description?: Sprint['description']

    @IsNotEmpty()
    @IsDate()
    readonly startDate: Sprint['startDate']

    @IsNotEmpty()
    @IsDate()
    readonly endDate: Sprint['endDate']

    @IsNumber()
    readonly sprintNumber: Sprint['sprintNumber']

    @IsOptional()
    user?: Sprint['user']
}
