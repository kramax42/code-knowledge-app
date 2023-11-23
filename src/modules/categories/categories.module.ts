import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { IsCategory } from '../../libs/validators/category.validator';
import { Category, categorySchema } from 'src/models/category.model';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [],
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: categorySchema },
    ]),
  ],
  providers: [IsCategory, CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
