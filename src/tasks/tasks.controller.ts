import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './tdos/create-task.dtos';
import { db } from 'src/main';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
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
    @Delete('/:id')
    async deleteOneTask(@Param('id') id: string) {
      const taskIndex = await this.taskService.deleteOneTask(id);
  
      if (taskIndex === -1) {
        throw new NotFoundException('Task with the given ID does not exist');
      }
  
      const tasks = await db.getData('/tasks');
      tasks.splice(taskIndex, 1);
  
      await db.push('/tasks', tasks, true);
  
      return { message: 'The Task has been deleted successfully!!!' };
    }

    @Post()
    createTask(@Body() body:CreateTaskDto){
        return this.taskService.createTask(body)
    }
}
