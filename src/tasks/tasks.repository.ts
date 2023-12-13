import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4}  from 'uuid'
import { CreateTaskDto } from "./tdos/create-task.dtos";
import { db } from "src/main";

@Injectable()
export class TasksRepository{

    async findAllTasks(){
        const allTasks = await db.getData('/tasks')
        return allTasks
    }

    async findOneTask(id:string){
        const allTasks = await db.getData(`/tasks`)
        const oneTask = allTasks.find((task:any)=> task.id === id)
        if(!oneTask){
            throw new NotFoundException("the id doesn't exist")
        }
        return oneTask
    }
    async deleteOneTask(id:string){
        const allTasks = await db.getData('/tasks')
        const updatedTask = allTasks.filter((task:any)=> task.id !== id)  
        await db.push('/tasks', updatedTask, true);
  
        return { message: 'The Task has been deleted successfully!!!' };
    }

         createTask(body:CreateTaskDto){
        try {
            const id = uuidv4()
            const categoryId = body.categoryId
            const newTasks = {id,categoryId, ...body}
            return db.push('/tasks[]', newTasks, true) 
            
        } catch (error) {
            throw new NotFoundException(`did not create task ${error}`)
            
        }
  
    }
  
}