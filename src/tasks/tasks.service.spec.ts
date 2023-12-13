import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto, TaskStatus } from './tdos/create-task.dtos';

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepo: TasksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useValue: {
            findAllTasks: jest.fn(),
            findOneTask: jest.fn(),
            deleteOneTask: jest.fn(),
            createTask: jest.fn(),
          },
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksRepo = module.get<TasksRepository>(TasksRepository);
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  describe('findAllTasks', () => {
    it('should call findAllTasks method of TasksRepository', async () => {
      await tasksService.findAllTasks();
      expect(tasksRepo.findAllTasks).toHaveBeenCalled();
    });
  });

  describe('findOneTask', () => {
    it('should call findOneTask method of TasksRepository with the provided id', async () => {
      const taskId = 'some-task-id';
      await tasksService.findOneTask(taskId);
      expect(tasksRepo.findOneTask).toHaveBeenCalledWith(taskId);
    });
  });

  describe('deleteOneTask', () => {
    it('should call deleteOneTask method of TasksRepository with the provided id', async () => {
      const taskId = 'some-task-id';
      await tasksService.deleteOneTask(taskId);
      expect(tasksRepo.deleteOneTask).toHaveBeenCalledWith(taskId);
    });
  });

  describe('createTask', () => {
    it('should call createTask method of TasksRepository with the provided body', async () => {
      const taskBody: CreateTaskDto = {
        title: '',
        status: TaskStatus.OPEN,
        description: '',
        categoryId: ''
      };
      await tasksService.createTask(taskBody);
      expect(tasksRepo.createTask).toHaveBeenCalledWith(taskBody);
    });
  });
});
