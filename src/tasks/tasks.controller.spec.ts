import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto, TaskStatus } from './tdos/create-task.dtos';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            findAllTasks: jest.fn(),
            findOneTask: jest.fn(),
            deleteOneTask: jest.fn(),
            createTask: jest.fn(),
          },
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  describe('displayAllTasks', () => {
    it('should call findAllTasks method of TasksService and return the result', async () => {
      const expectedResult = {message:'the task displayed successfully!!!'};
      (tasksService.findAllTasks as jest.Mock).mockReturnValue(expectedResult);

      expect(await tasksController.displayAllTasks()).toBe(expectedResult);
      expect(tasksService.findAllTasks).toHaveBeenCalled();
    });
  });

  describe('fetchOneTask', () => {
    it('should call findOneTask method of TasksService with the provided id and return the result', async () => {
      const taskId = 'some-task-id';
      const expectedResult = {message:'the task displayed successfully!!!'};;
      (tasksService.findOneTask as jest.Mock).mockReturnValue(expectedResult);

      expect(await tasksController.fetchOneTask(taskId)).toBe(expectedResult);
      expect(tasksService.findOneTask).toHaveBeenCalledWith(taskId);
    });
  });

  describe('deleteOneTask', () => {
    it('should call deleteOneTask method of TasksService with the provided id and return the result', async () => {
      const taskId = 'some-task-id';
      const expectedResult ={message:'the task displayed successfully!!!'};
      (tasksService.deleteOneTask as jest.Mock).mockReturnValue(expectedResult);

      expect(await tasksController.deleteOneTask(taskId)).toBe(expectedResult);
      expect(tasksService.deleteOneTask).toHaveBeenCalledWith(taskId);
    });
  });

  describe('createTask', () => {
    it('should call createTask method of TasksService with the provided body and return the result', async () => {
      const taskBody: CreateTaskDto = {
        title: 'hhhhh',
        description: 'jjjjj',
        categoryId: 'kkkkkk',
        status: TaskStatus.OPEN,
      };
      const expectedResult = {message:'the task displayed successfully!!!'};
      (tasksService.createTask as jest.Mock).mockReturnValue(expectedResult);

      expect(await tasksController.createTask(taskBody)).toBe(expectedResult);
      expect(tasksService.createTask).toHaveBeenCalledWith(taskBody);
    });
  });
});
