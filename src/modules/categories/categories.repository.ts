import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Category } from 'src/models/category.model';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: ModelType<Category>,
  ) {}

  async incrementSnippetsAmount(category: string) {
    const categoryDoc = await this.categoryModel.findOne({ category });
    if (categoryDoc) {
      categoryDoc.snippetsAmount = categoryDoc.snippetsAmount + 1;
      await categoryDoc.save();
    }
    return categoryDoc;
  }

  async decrementSnippetsAmount(category: string) {
    const categoryDoc = await this.categoryModel.findOne({ category });
    if (categoryDoc) {
      categoryDoc.snippetsAmount = categoryDoc.snippetsAmount - 1;
      await categoryDoc.save();
    }
    return categoryDoc;
  }

  async findAllCategoriesBySnippetsSizes() {
    const record: Record<string, { amount: number; categoryURLName: string }> =
      {};
    const categories = await this.categoryModel.find({});
    categories.forEach((c) => {
      record[c.category] = {
        amount: c.snippetsAmount,
        categoryURLName: c.categoryURLName,
      };
    });
    return record;
  }
}
