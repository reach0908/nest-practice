import { IsNumber } from 'class-validator'
import { Goal } from 'src/goal/entities/goal.entity'

export class CreateGoalLogDto {
    @IsNumber()
    readonly goalId: Goal['id']
}
