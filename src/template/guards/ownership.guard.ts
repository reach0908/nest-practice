import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

import { Observable } from 'rxjs'

import { RequestWithUser } from 'src/user/interfaces/reqeust-with-user.interface'

import { TemplateService } from '../template.service'
import { Template } from '../entities/template.entity'

@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor(private readonly templateService: TemplateService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return new Promise(async resolve => {
            try {
                const req = context.switchToHttp().getRequest<RequestWithUser>()
                const templateId: Template['id'] = Number(req.params.id)

                const sprint = await this.templateService.findOne(templateId)

                if (sprint.user.id === req.user.id) {
                    resolve(true)
                }

                resolve(false)
            } catch (err) {}
        })
    }
}
