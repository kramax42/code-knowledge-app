import { Module } from '@nestjs/common';
import { SnippetsController } from './snippets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { IsCategory } from 'src/libs/validators/category.validator';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { Snippet, snippetSchema } from 'src/models/snippet.model';
import { SnippetsService } from './snippets.service';

@Module({
  controllers: [SnippetsController],
  imports: [
    CategoriesModule,
    MongooseModule.forFeature([{ name: Snippet.name, schema: snippetSchema }]),
  ],
  providers: [IsCategory, SnippetsService],
})
export class SnippetsModule { }
