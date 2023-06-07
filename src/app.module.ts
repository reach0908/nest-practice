import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { SprintModule } from './sprint/sprint.module'
import { GoalModule } from './goal/goal.module'
import { GoalLogModule } from './goalLog/goalLog.module'
import { QuestionModule } from './question/question.module'
import { TemplateModule } from './template/template.module'
import { AnswerModule } from './answer/answer.module'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: true
        }),
        ScheduleModule.forRoot(),
        UserModule,
        AuthModule,
        SprintModule,
        GoalModule,
        GoalLogModule,
        QuestionModule,
        TemplateModule,
        AnswerModule
    ],
    providers: []
})
export class AppModule {}
