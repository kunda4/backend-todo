import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4}  from 'uuid'
import { db } from "src/main";
import { CreateCategoriesDto } from "./tdos/create-categories.tdos";

@Injectable()
export class CategoriesRepository{

    async findAllCategories(){
        try {
            const allCategories = await db.getData('/categories')
            if(!allCategories){
                throw new NotFoundException('No categories found')
            }
            return allCategories
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error
            }else{
                throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

    }

    async findOneCategories(id:string){
        try {
            const allCategories = await db.getData(`/categories`)
            const oneCategories = allCategories.find((Categories:any)=> Categories.id === id)
            if(!oneCategories){
                throw new NotFoundException("the id doesn't exist")
            }
            return oneCategories
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error
            }else{
                throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

    }

    async deleteOneCategories(id:string){
        try {
            const allCategories = await db.getData('/categories')
            const allTasks = await db.getData('/tasks')
            const categoriesToDelete = allCategories.find((Category:any)=>Category.id===id)
            if(!categoriesToDelete) throw new NotFoundException(`Category with id: ${id} not found`)
            const isCategoryUsedInTasks = allTasks.some((task: any) => task.categoryId === id);
            if (isCategoryUsedInTasks) {
              throw new ConflictException('Cannot delete category. It is used in tasks.');
            }
            else{
          const updatedCategories = allCategories.filter((Categories:any)=> Categories.id !== id)
          await db.push('/categories',updatedCategories, true);
      
          return { message: 'The Task has been deleted successfully!!!' };
        }
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            }else{
                throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

}
    async createCategories(body: CreateCategoriesDto){
        try {
            const id = uuidv4() 
            const newCategories = {id, ...body}
            await db.push('/categories[]', newCategories, true) 
            return {message: 'Category Created Successfully!!'}
        } catch (error) {
            if(error instanceof BadRequestException){
                throw new BadRequestException(`Bad request: ${error.message}`);
            }else{
                throw new NotFoundException(`Failed to create task: ${error}`)
            }
        }

    }
  
}