import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Objective } from './entities/objective.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Objective])],
	providers: [],
	exports: [],
})
export class ObjectiveModule {}
