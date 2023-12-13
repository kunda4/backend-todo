import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './tdos/create-task.dtos';

@Injectable()
export class TasksService {
  constructor(
    @Inject(forwardRef(() => TasksRepository))
    public tasksRepo: TasksRepository
    ) {}

  findAllTasks() {
    return this.tasksRepo.findAllTasks();
  }

  findOneTask(id: string) {
    return this.tasksRepo.findOneTask(id);
  }

  deleteOneTask(id: string) {
    return this.tasksRepo.deleteOneTask(id);
  }

  createTask(body: CreateTaskDto) {
    return this.tasksRepo.createTask(body);
  }
}
