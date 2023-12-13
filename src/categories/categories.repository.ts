import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
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
        if(!oneCategories){
            throw new NotFoundException("the id doesn't exist")
        }
        return oneCategories
    }

    async deleteOneCategories(id:string){
        const allCategories = await db.getData('/categories')
        const allTasks = await db.getData('/tasks')
        const isCategoryUsedInTasks = allTasks.some((task: any) => task.categoryId === id);
        if (isCategoryUsedInTasks) {
          throw new ConflictException('Cannot delete category. It is used in tasks.');
        }
        else{
      const updatedCategories = allCategories.filter((Categories:any)=> Categories.id !== id)
      await db.push('/categories',updatedCategories, true);
  
      return { message: 'The Task has been deleted successfully!!!' };
    }
}
    async createCategories(body: CreateCategoriesDto){
        const id = uuidv4() 
        const newCategories = {id, ...body}
        return db.push('/categories[]', newCategories, true) 
    }
  
}