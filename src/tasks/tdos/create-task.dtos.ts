import {IsString} from 'class-validator'
export class createTaskDtos{

    @IsString()
    task:string
}