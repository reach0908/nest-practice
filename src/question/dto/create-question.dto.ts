import { IsOptional, IsString } from 'class-validator'
import { Question } from 'src/question/entities/question.entity'
import { Template } from 'src/template/entities/template.entity'
import { User } from 'src/user/entities/user.entity'

export class CreateQuestionDto {
    @IsString()
    readonly question: Question['question']

    @IsOptional()
    template?: Template

    @IsString()
    user?: User
}
