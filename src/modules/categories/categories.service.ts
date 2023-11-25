import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Category } from 'src/models/category.model';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: ModelType<Category>,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async findAllCategories() {
    const record: Record<string, { categoryURLName: string }> = {};
    const categories = await this.categoryModel.find({});
    categories.forEach((category) => {
      record[category.category] = {
        categoryURLName: category.categoryURLName,
      };
    });
    return record;
  }

  async findAllCategoriesBySnippetsSizes() {
    return this.categoriesRepository.findAllCategoriesBySnippetsSizes();
  }

  async findAllCategoriesByQuestionsSizes() {
    const record: Record<string, { amount: number; categoryURLName: string }> =
      {};
    const categories = await this.categoryModel.find({});
    categories.forEach((c) => {
      record[c.category] = {
        amount: c.questionsAmount,
        categoryURLName: c.categoryURLName,
      };
    });
    return record;
  }

  async incrementQuestionsAmount(category: string) {
    const categoryDoc = await this.categoryModel.findOne({ category });
    if (categoryDoc) {
      categoryDoc.questionsAmount = categoryDoc.questionsAmount + 1;
      await categoryDoc.save();
    }
    return categoryDoc;
  }

  async decrementQuestionsAmount(category: string) {
    const categoryDoc = await this.categoryModel.findOne({ category });
    if (categoryDoc) {
      categoryDoc.questionsAmount = categoryDoc.questionsAmount - 1;
      await categoryDoc.save();
    }
    return categoryDoc;
  }
}
