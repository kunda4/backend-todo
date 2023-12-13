import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateCategoriesDto{  
    @ApiProperty({
        name: 'name',
        required: true
     })  
    @IsString()
    name:string
}