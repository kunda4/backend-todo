import { Controller, Get, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(public taskService: TasksService){}

    @Get()
    displayAllTasks(){
        return this.taskService.findAllTasks()
    }

    @Get('/:id')
    fetchOneTask(id:string){
       const message = this.taskService.findOneTask(id)
        if(!message){
            throw new NotFoundException("the id doesn't exist")
        }
        return message
    }
}
