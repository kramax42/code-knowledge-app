import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Category } from 'src/models/category.model';
import { ItemCategoriesSizes } from './categories.types';

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

  async getSnippetCategoriesSizes() {
    // const record: ItemCategoriesSizes = {};
    const categories = await this.categoryModel.find({});
    // categories.forEach(({ category, snippetsAmount, categoryURLName }) => {
    //   record[category] = {
    //     amount: snippetsAmount,
    //     categoryURLName,
    //   };
    // });

    // return record;

    // TODO: move to service
    return categories.reduce((accumulator, current) => {
      const { category, snippetsAmount, categoryURLName } = current;

      return {
        ...accumulator,
        [category]: {
          amount: snippetsAmount,
          categoryURLName,
        },
      };
    }, {} as ItemCategoriesSizes);
  }
}
