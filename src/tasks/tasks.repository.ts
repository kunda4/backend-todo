import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './tdos/create-task.dtos';
import { db } from '../Helper/dataBase';


@Injectable()
export class TasksRepository {
  async findAllTasks() {
    try {
      const allTasks = await db.getData('/tasks');
      if (!allTasks) {
        throw new NotFoundException('No tasks found');
      }
      return allTasks;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async findOneTask(id: string) {
    try {
      const allTasks = await db.getData(`/tasks`);
      const oneTask = allTasks.find((task: any) => task.id === id);
      if (!oneTask) {
        throw new NotFoundException("the id doesn't exist");
      }
      return oneTask;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  async deleteOneTask(id: string) {
    try {
      const allTasks = await db.getData('/tasks');
      const taskToDelete = allTasks.find((task: any) => task.id === id);
      if (!taskToDelete) {
        throw new NotFoundException(`Task with Id ${id} not found`);
      }
      const updatedTask = allTasks.filter((task: any) => task.id !== id);
      await db.push('/tasks', updatedTask, true);

      return { message: 'The Task has been deleted successfully!!!' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async createTask(body: CreateTaskDto) {
    try {
      const id = uuidv4();
      const categoryId = body.categoryId;
      const newTasks = { id, categoryId, ...body };
      await db.push('/tasks[]', newTasks, true);
      return { message: 'Task created successfully!' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(`Bad request: ${error.message}`);
      } else {
        throw new NotFoundException(`Failed to create task: ${error}`);
      }
    }
  }
}
