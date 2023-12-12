import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './tdos/create-categories.tdos';
import { db } from 'src/main';


@Controller('categories')
export class CategoriesController {
    constructor(public categoriesController:CategoriesService){}

    @Get()
        getCategories(){
        return this.categoriesController.getCategories()  
    }

    @Post()
    createCategories(@Body() body:CreateCategoriesDto){
        return this.categoriesController.createCategories(body)
        
    }
    @Get('/:id')
    async fetchOneTask(@Param('id') id:string){
       const message = await this.categoriesController.getOneCategories(id)
        if(!message){
            throw new NotFoundException("the id doesn't exist")
        }
        return message
    }
    @Delete('/:id')
    async deleteOneTask(@Param('id') id: string) {
      const taskIndex = await this.categoriesController.deleteOneCategories (id);
  
      if (taskIndex === -1) {
        throw new NotFoundException('Task with the given ID does not exist');
      }
  
      const tasks = await db.getData('/tasks');
      tasks.splice(taskIndex, 1);
  
      await db.push('/tasks', tasks, true);
  
      return { message: 'The Task has been deleted successfully!!!' };
    }


}
