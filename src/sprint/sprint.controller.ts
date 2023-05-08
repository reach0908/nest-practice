import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SprintService } from './sprint.service';

import { Sprint } from './entities/sprint.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Sprint])],
	providers: [SprintService],
	exports: [SprintService],
})
export class SprintModule {}
