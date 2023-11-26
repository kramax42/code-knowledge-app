import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IsCategory } from 'src/libs/validators/category.validator';
import { Category, categorySchema } from 'src/models/category.model';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { QueryHandlers } from './queries/handlers';

@Module({
  controllers: [],
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: categorySchema },
    ]),
  ],
  providers: [
    IsCategory,
    CategoriesService,
    CategoriesRepository,
    ...QueryHandlers,
  ],
  exports: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
