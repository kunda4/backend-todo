import { Injectable } from "@nestjs/common";
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
        return oneTask
    }

    async createTask(body:CreateTaskDto){
        const id = uuidv4()
        const newTasks = {id, ...body}
        return db.push('/tasks[]', newTasks, true) 
    }
  
}