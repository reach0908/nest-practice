import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GoalLog } from './entities/goalLog.entity'
import { GoalLogService } from './goalLog.service'

@Module({
    imports: [TypeOrmModule.forFeature([GoalLog])],
    providers: [GoalLogService],
    exports: [GoalLogService]
})
export class GoalLogModule {}
