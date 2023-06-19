import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Sprint } from './entities/sprint.entity'
import { SprintService } from './sprint.service'
import { SprintController } from './sprint.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Sprint])],
    controllers: [SprintController],
    providers: [SprintService],
    exports: [SprintService]
})
export class SprintModule {}
