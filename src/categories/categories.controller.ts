import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './tdos/create-categories.tdos';
import { ApiResponse, ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';


@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(public categoriesController:CategoriesService){}

    @Get()
    @ApiOperation({ summary: 'Get all categories', description: 'Get a list of all categories' })
    @ApiResponse({ status: 200, description: 'Successful operation', type: [CreateCategoriesDto] })
        getCategories(){
        return this.categoriesController.getCategories()  
    }

    @Post()    
    @ApiOperation({ summary: 'Create a category', description: 'Create a new category' })
    @ApiResponse({ status: 201, description: 'Category created successfully', type: CreateCategoriesDto })
    @ApiBody({
       type: CreateCategoriesDto,
       description: 'Json structure for user object',
    })

    createCategories(@Body() body:CreateCategoriesDto){
        return this.categoriesController.createCategories(body)
        
    }
    @Get('/:id')
    @ApiOperation({ summary: 'Get a category by ID', description: 'Get details of a category by its ID' })
    @ApiResponse({ status: 200, description: 'Successful operation', type: CreateCategoriesDto })
    @ApiResponse({ status: 404, description: 'Category not found' })
    async fetchOneTask(@Param('id') id:string){
       const message = await this.categoriesController.getOneCategories(id)
        if(!message){
            throw new NotFoundException("the id doesn't exist")
        }
        return message
    }
    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a category by ID', description: 'Delete a category by its ID' })
    @ApiResponse({ status: 200, description: 'Category deleted successfully' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    async deleteOneTask(@Param('id') id: string) {
      const oneTask = await this.categoriesController.deleteOneCategories(id);
    }

    
}
