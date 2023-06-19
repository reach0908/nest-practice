import { IsOptional, IsDate, IsNotEmpty } from 'class-validator'

import { Sprint } from '../entities/sprint.entity'

export class CreateSprintDto {
    @IsNotEmpty()
    @IsDate()
    readonly startDate: Sprint['startDate']

    @IsNotEmpty()
    @IsDate()
    readonly endDate: Sprint['endDate']

    @IsOptional()
    user?: Sprint['user']
}
