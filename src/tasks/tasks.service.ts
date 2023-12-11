import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './tdos/create-task.dtos';

@Injectable()
export class TasksService {
    constructor(public tasksRepo: TasksRepository){}

    findAllTasks(){
        return this.tasksRepo.findAllTasks()
    }

    findOneTask(id:string){
        return this.tasksRepo.findOneTask(id)
    }

    createTask(body:CreateTaskDto){
        return this.tasksRepo.createTask(body)
    }

}
