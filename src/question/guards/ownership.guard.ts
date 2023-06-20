import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

import { Observable } from 'rxjs'

import { RequestWithUser } from 'src/user/interfaces/reqeust-with-user.interface'

import { QuestionService } from '../question.service'
import { Question } from '../entities/question.entity'
@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor(private readonly questionService: QuestionService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return new Promise(async resolve => {
            try {
                const req = context.switchToHttp().getRequest<RequestWithUser>()
                const templateId: Question['id'] = Number(req.params.id)

                const question = await this.questionService.findOne(templateId)

                if (question.template.user.id === req.user.id) {
                    resolve(true)
                }

                resolve(false)
            } catch (err) {}
        })
    }
}
