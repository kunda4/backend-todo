import { IsString } from "class-validator"

export class CreateCategoriesDto{
    @IsString()
    id:string
    @IsString()
    name:string
}