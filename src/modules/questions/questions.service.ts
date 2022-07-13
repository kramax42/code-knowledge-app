import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { categories } from 'src/constants/categories.constants';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/questions.dto';
import { QuestionModel } from './question.model';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(QuestionModel.name)
    private readonly questionModel: ModelType<QuestionModel>,
    
  ) {}

  async findAll(
    category: string,
    documentsToSkip = 0,
    limitOfDocuments?: number,
  ) {
    const findQuery = this.questionModel
      .find({ category })
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;

    return results;
  }

  async create(dto: CreateQuestionDto) {
    return this.questionModel.create(dto);
  }

  async findById(id: string) {
    return this.questionModel.findById(id).exec();
  }

  async deleteById(id: string) {
    return this.questionModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: UpdateQuestionDto) {
    return this.questionModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async getCategoriesSizes() {
    const categoriesObj: Record<string, number> = {};
    
    //https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/
    await Promise.all(categories.map(async (category) => {
      categoriesObj[category] = await this.questionModel.countDocuments({category});
    }))
    return categoriesObj;
  }
}
