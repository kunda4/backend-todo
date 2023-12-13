import { Module, forwardRef } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [forwardRef(() =>  TasksModule), forwardRef(() => CategoriesModule)],

})
export class AppModule {}
