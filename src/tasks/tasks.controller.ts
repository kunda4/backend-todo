import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(public taskService: TasksService){}

    @Get()
    displayAllTasks(){
        return this.taskService.findAllTasks()
    }
}
