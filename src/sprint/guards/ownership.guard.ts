import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

import { RequestWithUser } from 'src/room/interfaces/request-with-user.interface';

import { SprintService } from '../sprint.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
	constructor(private readonly sprintService: SprintService) {}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		return new Promise(async (resolve) => {
			try {
				const req = context
					.switchToHttp()
					.getRequest<RequestWithUser>();
				const sprintId = req.params.id;

				const sprint = await this.sprintService.findOne(
					sprintId
				);

				if (sprint.user.id === req.user.id) {
					resolve(true);
				}

				resolve(false);
			} catch (err) {}
		});
	}
}
