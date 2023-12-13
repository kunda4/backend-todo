import { Body, Controller, Delete, Get, Inject, Param, Post, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './tdos/create-task.dtos';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(forwardRef(() => TasksService))
    public taskService: TasksService
    ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all Tasks',
    description: 'Get a list of all Tasks',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [CreateTaskDto],
  })
  displayAllTasks() {
    return this.taskService.findAllTasks();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get a task by ID',
    description: 'Get details of a task by its ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: CreateTaskDto,
  })
  @ApiResponse({ status: 404, description: 'task not found' })
  fetchOneTask(@Param('id') id: string) {
    return this.taskService.findOneTask(id);
  }
  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete a task by ID',
    description: 'Delete a task by its ID',
  })
  @ApiResponse({ status: 200, description: 'task deleted successfully' })
  @ApiResponse({ status: 404, description: 'task not found' })
  deleteOneTask(@Param('id') id: string) {
    return this.taskService.deleteOneTask(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a task', description: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'task created successfully',
    type: CreateTaskDto,
  })
  @ApiBody({
    type: CreateTaskDto,
    description: 'Json structure for user object',
  })
  createTask(@Body() body: CreateTaskDto) {
    return this.taskService.createTask(body);
  }
}
