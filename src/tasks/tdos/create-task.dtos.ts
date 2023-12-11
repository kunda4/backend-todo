import { IsString, IsEnum, IsOptional } from 'class-validator';

export enum TaskStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  OPEN = 'OPEN',
}

export class CreateTaskDto {

  @IsString()
  title: string;

  @IsEnum(TaskStatus)
  @IsOptional() 
  status: TaskStatus = TaskStatus.OPEN;

  @IsString()
  description: string;
}
