import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Objective } from 'src/objective/entities/objective.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(Task)
		private readonly taskRepository: Repository<Task>,
		@InjectRepository(Objective)
		private readonly objectiveRepository: Repository<Objective>
	) {}

	async getTask(id: Task['id']): Promise<Task> {
		const task = await this.taskRepository.findOne({
			where: { id },
		});

		if (!task) {
			throw new NotFoundException(
				`Cannot find task id with ${id}`
			);
		}

		return task;
	}

	async getTasksByObjective(id: Objective['id']): Promise<Array<Task>> {
		const tasks = await this.taskRepository.find({
			where: { objective: { id } },
			relations: ['objective'],
		});

		return tasks;
	}

	async createTask(
		objecitveId: Objective['id'],
		createTaskDto: CreateTaskDto
	) {
		const objective = await this.objectiveRepository.findOne({
			where: { id: objecitveId },
			relations: ['tasks', 'user'],
		});

		const task = await this.taskRepository.create({
			...createTaskDto,
			objective,
		});

		return await this.taskRepository.save(task);
	}

	async removeTask(id: Task['id']) {
		const task = await this.taskRepository.findOne({
			where: { id },
		});

		if (!task) {
			throw new NotFoundException(
				`Cannot find task with id ${id}`
			);
		}

		return await this.taskRepository.delete(task);
	}
}
