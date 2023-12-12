import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
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
    @Delete()
    async deleteOneTask(@Param('id') id:string){
        const task = await this.taskService.deleteOneTask(id)
        if(!task){
            throw new NotFoundException('the id does not exist')
        }
        return {message: 'The Task has been deleted successfully!!!'}
    }

    @Post()
    createTask(@Body() body:CreateTaskDto){
        return this.taskService.createTask(body)
    }
}
