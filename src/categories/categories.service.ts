import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoriesDto } from './tdos/create-categories.tdos';

@Injectable()
export class CategoriesService {
    constructor(public categoriesService:CategoriesRepository){}

    createCategories(body:CreateCategoriesDto){
        return this.categoriesService.createCategories(body)
    }
    getCategories(){
        return this.categoriesService.findAllCategories()
    }
    getOneCategories(id:string){
        return this.categoriesService.findOneCategories(id)
    }
    deleteOneCategories(id:string){
        return this.categoriesService.deleteOneCategories(id)
    }
}
