import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './tdos/create-task.dtos';

@Controller('tasks')
export class TasksController {
    constructor(public taskService: TasksService){}

    @Get()
    displayAllTasks(){
        return this.taskService.findAllTasks()
    }

    @Get('/:id')
    async fetchOneTask(@Param('id') id:string){
       const message = await this.taskService.findOneTask(id)
        if(!message){
            throw new NotFoundException("the id doesn't exist")
        }
        return message
    }

    @Post()
    createTask(@Body() body:CreateTaskDto){
        return this.taskService.createTask(body)
    }
}
