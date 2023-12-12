import { Injectable } from "@nestjs/common";
import { v4 as uuidv4}  from 'uuid'
import { db } from "src/main";
import { CreateCategoriesDto } from "./tdos/create-categories.tdos";

@Injectable()
export class CategoriesRepository{

    async findAllCategories(){
        const allCategories = await db.getData('/categories')
        return allCategories
    }

    async findOneCategories(id:string){
        const allCategories = await db.getData(`/categories`)
        const oneCategories = allCategories.find((Categories:any)=> Categories.id === id)
        return oneCategories
    }
    async deleteOneCategories(id:string){
        const allCategories = await db.getData('/categories')
        const oneCategories = allCategories.find((Categories:any)=> Categories.id === id)
        return oneCategories
    }

    async createCategories(body: CreateCategoriesDto){
        const id = uuidv4()
        const newCategories = {id, ...body}
        return db.push('/categories[]', newCategories, true) 
    }
  
}