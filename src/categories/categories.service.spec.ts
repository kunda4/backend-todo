import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoriesDto } from './tdos/create-categories.tdos';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let categoriesRepository: CategoriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, CategoriesRepository],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
    categoriesRepository =
      module.get<CategoriesRepository>(CategoriesRepository);
  });

  it('should be defined', () => {
    expect(categoriesService).toBeDefined();
  });

  it('should create a category', async () => {
    const createCategoriesDto: CreateCategoriesDto = {
      name: 'Category any name',
    };

    jest
      .spyOn(categoriesRepository, 'createCategories')
      .mockResolvedValueOnce({ message: 'Category Created Successfully!!' });

    const result =
      await categoriesService.createCategories(createCategoriesDto);
    expect(result).toBeDefined();
    expect(result.message).toBe('Category Created Successfully!!');
  });

  it('should get all categories', async () => {
    jest
      .spyOn(categoriesRepository, 'findAllCategories')
      .mockResolvedValueOnce({
        /* Mock your data */
      });

    const result = await categoriesService.getCategories();
    expect(result).toBeDefined();
  });

  it('should get one category by id', async () => {
    const categoryId = 'some-id';

    jest
      .spyOn(categoriesRepository, 'findOneCategories')
      .mockResolvedValueOnce({});

    const result = await categoriesService.getOneCategories(categoryId);
    expect(result).toBeDefined();
  });

  it('should delete one category by id', async () => {
    const categoryId = '1233';

    jest
      .spyOn(categoriesRepository, 'deleteOneCategories')
      .mockResolvedValueOnce({
        message: 'The Task has been deleted successfully!!!',
      });

    const result = await categoriesService.deleteOneCategories(categoryId);
    expect(result).toBeDefined();
    expect(result.message).toBe('The Task has been deleted successfully!!!');
  });
});
