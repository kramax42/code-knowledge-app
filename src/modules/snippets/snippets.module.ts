import { Module } from '@nestjs/common';
import { SnippetsController } from './snippets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { IsCategory } from 'src/libs/validators/category.validator';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { Snippet, snippetSchema } from 'src/models/snippet.model';
import { SnippetsService } from './snippets.service';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './queries/handlers';
import { SnippetsRepository } from './snippets.repository';

@Module({
  controllers: [SnippetsController],
  imports: [
    CqrsModule,
    CategoriesModule,
    MongooseModule.forFeature([{ name: Snippet.name, schema: snippetSchema }]),
  ],
  providers: [
    IsCategory,
    SnippetsService,
    SnippetsRepository,
    ...QueryHandlers,
  ],
})
export class SnippetsModule {}
