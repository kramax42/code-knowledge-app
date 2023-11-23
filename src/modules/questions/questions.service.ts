import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateQuestionDto, UpdateQuestionDto } from '../../dtos/question.dto';
import { Question } from 'src/models/question.model';
import { CategoriesService } from 'src/modules/categories/categories.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: ModelType<Question>,
    private readonly categoriesService: CategoriesService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async findAll(category: string, skip = 0, limit?: number) {
    const findQuery = this.questionModel
      .find({ category })
      .sort({ _id: 1 })
      .skip(skip);

    if (limit) {
      findQuery.limit(limit);
    }
    const foundQuestions = await findQuery;
    return foundQuestions;
  }

  async findRandom(category: string, limit: number): Promise<Question[]> {
    const randomQuestions = await this.questionModel
      .aggregate([{ $match: { category } }, { $sample: { size: limit } }])
      .exec();
    return randomQuestions;
  }

  async create(dto: CreateQuestionDto) {
    const session: mongoose.ClientSession =
      await this.connection.startSession();

    session.startTransaction();
    let createdQuestion = null;
    try {
      createdQuestion = await this.questionModel.create(dto);

      const categoryDoc = await this.categoriesService.incrementQuestionsAmount(
        dto.category,
      );
      if (!categoryDoc) {
        await session.abortTransaction();
      }
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
      return createdQuestion;
    }
  }

  async findById(id: string) {
    return this.questionModel.findById(id).exec();
  }

  async deleteById(id: string) {
    const session: mongoose.ClientSession =
      await this.connection.startSession();

    session.startTransaction();
    let deletedQuestion = null;
    try {
      const question = await this.questionModel.findById(id);
      if (!question) {
        await session.abortTransaction();
      }

      const categoryDoc = await this.categoriesService.decrementQuestionsAmount(
        question.category,
      );
      deletedQuestion = await this.questionModel.findByIdAndDelete(id).exec();

      if (!categoryDoc) {
        await session.abortTransaction();
      }
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
      return deletedQuestion;
    }
  }

  async updateById(id: string, dto: UpdateQuestionDto) {
    const session: mongoose.ClientSession =
      await this.connection.startSession();

    session.startTransaction();
    let updatedQuestion = null;
    try {
      const existedQuestion = await this.questionModel.findById(id);
      if (!existedQuestion) {
        await session.abortTransaction();
      }
      if (existedQuestion.category != dto.category) {
        let categoryDoc = await this.categoriesService.decrementQuestionsAmount(
          existedQuestion.category,
        );
        if (!categoryDoc) {
          await session.abortTransaction();
        }

        categoryDoc = await this.categoriesService.incrementQuestionsAmount(
          dto.category,
        );
        if (!categoryDoc) {
          await session.abortTransaction();
        }
      }

      updatedQuestion = this.questionModel
        .findByIdAndUpdate(id, dto, { new: true })
        .exec();

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
      return updatedQuestion;
    }
  }

  async getCategoriesSizes() {
    // const categoriesObj: Record<string, number> = {};

    // //https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/
    // await Promise.all(categories.map(async (category) => {
    //   categoriesObj[category] = await this.questionModel.countDocuments({ category });
    // }))

    const categoriesRecord =
      await this.categoriesService.findAllCategoriesByQuestionsSizes();

    return categoriesRecord;
  }
}
