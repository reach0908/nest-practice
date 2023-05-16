import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Sprint } from './entities/sprint.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Sprint])],
    providers: [],
    exports: []
})
export class SprintModule {}
