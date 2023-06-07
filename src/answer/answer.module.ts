import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Answer } from './entity/answer.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Answer])],
    providers: [],
    exports: []
})
export class AnswerModule {}
