import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './tdos/create-categories.tdos';
import { CategoriesRepository } from './categories.repository';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService,CategoriesRepository],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  describe('getCategories', () => {
    it('should return an array of categories', async () => {
      const categories: CreateCategoriesDto[] = [{name:'myname'}];
      jest.spyOn(service, 'getCategories').mockResolvedValue(categories);

      expect(await controller.getCategories()).toBe(categories);
    });
  });

  describe('createCategories', () => {
    it('should create a new category', async () => {
      const newCategory: CreateCategoriesDto = {
        name: "hhhhhhhhh"
      };
  
      // Mocking a response similar to what the service method should return
      const mockedResponse = { message: 'Category created successfully' };
  
      jest.spyOn(service, 'createCategories').mockResolvedValue(mockedResponse);
  
      // Ensure the controller method returns the expected response
      expect(await controller.createCategories(newCategory)).toBe(mockedResponse);
    });
  });
  

  describe('fetchOneTask', () => {
    it('should return a category by ID', async () => {
      const categoryId = '7b83d4b3-403a-400e-ac76-e72394ffc866';
      const category: CreateCategoriesDto = {
        name: 'jjjj'
      };
      jest.spyOn(service, 'getOneCategories').mockResolvedValue(category);

      expect(await controller.fetchOneTask(categoryId)).toBe(category);
    });

    it('should return 404 if category not found', async () => {
      const categoryId = '999';
      jest.spyOn(service, 'getOneCategories').mockResolvedValue(categoryId);

      await expect(controller.fetchOneTask(categoryId)).rejects.toThrowError('Category not found');
    });
  });

  describe('deleteOneTask', () => {
    it('should delete a category by ID', async () => {
      const categoryId = '786c29c9-0f5f-4a91-bc71-6e1417544f12';
      const mockedResponse = { message: 'category deleted successfully' };
      jest.spyOn(service, 'deleteOneCategories').mockResolvedValue(mockedResponse);

      expect(await controller.deleteOneTask(categoryId)).toEqual({ status: 'Category deleted successfully' });
    });

    it('should return 404 if category not found', async () => {
      const categoryId = '12345';
      jest.spyOn(service, 'deleteOneCategories').mockRejectedValue(new Error('Category not found'));

      await expect(controller.deleteOneTask(categoryId)).rejects.toThrowError('Category not found');
    });
  });
});
