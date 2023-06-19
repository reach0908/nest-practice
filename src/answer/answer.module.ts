import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Answer } from './entity/answer.entity'
import { AnswerService } from './answer.service'
import { AnswerController } from './answer.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Answer])],
    controllers: [AnswerController],
    providers: [AnswerService],
    exports: [AnswerService]
})
export class AnswerModule {}
