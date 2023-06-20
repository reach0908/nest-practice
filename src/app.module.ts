import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { ConfigModule, ConfigService } from '@nestjs/config'
import Config from 'config/config'

import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { SprintModule } from './sprint/sprint.module'
import { GoalModule } from './goal/goal.module'
import { GoalLogModule } from './goalLog/goalLog.module'
import { QuestionModule } from './question/question.module'
import { TemplateModule } from './template/template.module'
import { AnswerModule } from './answer/answer.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            load: [Config]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: +configService.get<number>('DB_PORT'),
                    // username: configService.get('DB_USERNAME'),
                    // database: configService.get('DB_DATABASE'),
                    // password: configService.get('DB_PASSWORD'),
                    synchronize: true
                }
            }
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
