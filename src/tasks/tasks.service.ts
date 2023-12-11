import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
    constructor(public tasksRepo: TasksRepository){}

    findAllTasks(){
        return this.tasksRepo.findAllTasks()
    }

    findOneTask(id:string){
        return this.tasksRepo.findOneTask(id)
    }

}
