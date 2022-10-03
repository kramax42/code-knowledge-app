import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Category } from 'src/models/category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: ModelType<Category>) { }

  async findAllCategories() {
    const categories = await this.categoryModel.find({});
    return categories.map(c => c.category);
  }

  async findAllCategoriesByQuestionsSizes() {
    const record: Record<string, number> = {};
    const categories = await this.categoryModel.find({});
    categories.forEach(c => record[c.category] = c.questionsAmount);
    return record;
  }

  async findAllCategoriesBySnippetsSizes() {
    const record: Record<string, number> = {};
    const categories = await this.categoryModel.find({});
    categories.forEach(c => record[c.category] = c.snippetsAmount);
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

  async incrementSnippetsAmount(category: string) {
    const categoryDoc = await this.categoryModel.findOne({ category });
    if (categoryDoc) {
      categoryDoc.snippetsAmount = categoryDoc.snippetsAmount + 1;
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

  async decrementSnippetsAmount(category: string) {
    const categoryDoc = await this.categoryModel.findOne({ category });
    if (categoryDoc) {
      categoryDoc.snippetsAmount = categoryDoc.snippetsAmount - 1;
      await categoryDoc.save();
    }
    return categoryDoc;
  }
}
