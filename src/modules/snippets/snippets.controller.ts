import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryValidationPipe } from 'src/libs/pipes/category-validation.pipe';
import { IdValidationPipe } from 'src/libs/pipes/id-validation.pipe';
import { PaginationParamsDto } from 'src/libs/utils/pagination-params';

import { CreateSnippetDto, UpdateSnippetDto } from '../../dtos/snippet.dto';
import { SNIPPET_NOT_FOUND_ERROR } from './snippets.constants';
import { SnippetsService } from './snippets.service';
import { QueryBus } from '@nestjs/cqrs';
import { GetSnippetsQuery } from './queries/impl';
import { GetSnippetCategoriesSizesQuery } from '../categories/queries/impl';
import { ItemCategoriesSizes } from '../categories/categories.types';
import { AuthSuperTokensGuard } from '../auth-super-tokens/auth-super-tokens.guard';
import { getAdminRoleValidator } from '../auth-super-tokens/auth-super-tokens.util';

@Controller('snippets')
export class SnippetsController {
  constructor(
    private readonly snippetsService: SnippetsService,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':category')
  async findAll(
    @Param('category', CategoryValidationPipe) category: string,
    @Query() { skip, limit }: PaginationParamsDto,
  ) {
    return this.queryBus.execute(new GetSnippetsQuery(category, skip, limit));
  }

  @Get()
  async getCategoriesSizes() {
    const sizes = await this.queryBus.execute<
      GetSnippetCategoriesSizesQuery,
      ItemCategoriesSizes
    >(new GetSnippetCategoriesSizesQuery());

    if (!sizes) {
      throw new NotFoundException(SNIPPET_NOT_FOUND_ERROR);
    }

    return sizes;
  }

  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(new AuthSuperTokensGuard(getAdminRoleValidator()))
  @Post()
  async create(@Body() dto: CreateSnippetDto) {
    console.log('admin create snippet');

    const createdSnippet = await this.snippetsService.create(dto);

    return createdSnippet;
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const snippet = await this.snippetsService.findById(id);
    if (!snippet) {
      throw new NotFoundException(SNIPPET_NOT_FOUND_ERROR);
    }

    return snippet;
  }

  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(new AuthSuperTokensGuard(getAdminRoleValidator()))
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedSnippet = await this.snippetsService.deleteById(id);
    if (!deletedSnippet) {
      throw new NotFoundException(SNIPPET_NOT_FOUND_ERROR);
    }
  }

  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(new AuthSuperTokensGuard(getAdminRoleValidator()))
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: UpdateSnippetDto,
  ) {
    const updatedSnippet = await this.snippetsService.updateById(id, dto);
    if (!updatedSnippet) {
      throw new NotFoundException(SNIPPET_NOT_FOUND_ERROR);
    }
    return updatedSnippet;
  }
}
