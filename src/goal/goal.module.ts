import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Goal } from './entities/goal.entity'
import { GoalService } from './goal.service'
import { GoalController } from './goal.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Goal])],
    controllers: [GoalController],
    providers: [GoalService],
    exports: [GoalService]
})
export class GoalModule {}
