import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GoalLog } from './entities/goalLog.entity'

@Module({
    imports: [TypeOrmModule.forFeature([GoalLog])],
    providers: [],
    exports: []
})
export class GoalLogModule {}
