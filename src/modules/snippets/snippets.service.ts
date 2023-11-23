import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateSnippetDto, UpdateSnippetDto } from '../../dtos/snippet.dto';
import { CategoriesService } from 'src/modules/categories/categories.service';
import { Snippet } from 'src/models/snippet.model';
import { CommandBus } from '@nestjs/cqrs';
import { KillDragonCommand } from './kill-dragon.command';



@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel(Snippet.name)
    private readonly snippetModel: ModelType<Snippet>,
    private readonly categoriesService: CategoriesService,
    @InjectConnection() private readonly connection: mongoose.Connection,
    // private commandBus: CommandBus,
  ) {}


  // async killDragon(heroId: string, killDragonDto: KillDragonDto) {
  //   return this.commandBus.execute(
  //     new KillDragonCommand(heroId, killDragonDto.dragonId)
  //   );
  // }

  async findAll(category: string, skip = 0, limit?: number) {
    const findQuery = this.snippetModel
      .find({ category })
      .sort({ _id: 1 })
      .skip(skip);

    if (limit) {
      findQuery.limit(limit);
    }
    const foundSnippets = await findQuery;
    return foundSnippets;
  }

  async create(dto: CreateSnippetDto) {
    const session: mongoose.ClientSession =
      await this.connection.startSession();

    session.startTransaction();
    let createdSnippet = null;
    try {
      createdSnippet = await this.snippetModel.create(dto);

      const categoryDoc = await this.categoriesService.incrementSnippetsAmount(
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
      return createdSnippet;
    }
  }

  async findById(id: string) {
    return this.snippetModel.findById(id).exec();
  }

  async deleteById(id: string) {
    const session: mongoose.ClientSession =
      await this.connection.startSession();

    session.startTransaction();
    let deletedSnippet = null;
    try {
      const snippet = await this.snippetModel.findById(id);
      if (!snippet) {
        await session.abortTransaction();
      }

      const categoryDoc = await this.categoriesService.decrementSnippetsAmount(
        snippet.category,
      );
      deletedSnippet = await this.snippetModel.findByIdAndDelete(id).exec();

      if (!categoryDoc) {
        await session.abortTransaction();
      }
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
      return deletedSnippet;
    }
  }

  async updateById(id: string, dto: UpdateSnippetDto) {
    const session: mongoose.ClientSession =
      await this.connection.startSession();

    session.startTransaction();
    let updatedSnippet = null;
    try {
      const existedSnippet = await this.snippetModel.findById(id);
      if (!existedSnippet) {
        await session.abortTransaction();
      }
      if (existedSnippet.category != dto.category) {
        let categoryDoc = await this.categoriesService.decrementSnippetsAmount(
          existedSnippet.category,
        );
        if (!categoryDoc) {
          await session.abortTransaction();
        }

        categoryDoc = await this.categoriesService.incrementSnippetsAmount(
          dto.category,
        );
        if (!categoryDoc) {
          await session.abortTransaction();
        }
      }

      updatedSnippet = this.snippetModel
        .findByIdAndUpdate(id, dto, { new: true })
        .exec();

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
      return updatedSnippet;
    }
  }

  async getCategoriesSizes() {
    const categoriesRecord =
      await this.categoriesService.findAllCategoriesBySnippetsSizes();
    return categoriesRecord;
  }
}
