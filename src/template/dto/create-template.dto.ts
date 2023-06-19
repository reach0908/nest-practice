import { IsOptional, IsString, IsBoolean } from 'class-validator'
import { Template } from '../entities/template.entity'
import { Question } from 'src/question/entities/question.entity'

export class CreateTemplateDto {
    @IsString()
    readonly name: Template['name']

    @IsOptional()
    @IsString()
    readonly type?: Template['type']

    @IsBoolean()
    @IsOptional()
    readonly isOn?: Template['isOn']

    @IsOptional()
    user?: Template['user']

    @IsOptional()
    questions?: Array<Question['id']>
}
