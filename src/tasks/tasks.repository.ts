import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";
import { v4 as uuidv4}  from 'uuid'

@Injectable()
export class TasksRepository{

    async findAllTasks(){
        const allTasks = await readFile("db.json", "utf-8")
        const allTask = allTasks.trim()? JSON.parse(allTasks) : {}
        return allTask
    }

    async findOneTask(id:string){
        const allTasks = await readFile("db.json", "utf-8")
        const allTask =  allTasks.trim()? JSON.parse(allTasks) : {}
        return allTask[id]
    }
  
}