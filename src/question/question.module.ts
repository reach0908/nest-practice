import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Question } from './entities/question.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Question])],
    providers: [],
    exports: []
})
export class QuestionModule {}
