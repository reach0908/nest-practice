import { IsOptional, IsString } from 'class-validator'
import { Question } from 'src/question/entities/question.entity'
import { Template } from 'src/template/entities/template.entity'

export class UpdateQuestionDto {
    @IsString()
    @IsOptional()
    readonly question?: Question['question']

    @IsOptional()
    @IsOptional()
    template?: Template
}
