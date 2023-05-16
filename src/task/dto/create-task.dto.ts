import { IsString, IsDate, IsNotEmpty } from 'class-validator'
export class CreateTaskDto {
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsDate()
    readonly startDate: string

    @IsNotEmpty()
    @IsDate()
    readonly endDate: string
}
