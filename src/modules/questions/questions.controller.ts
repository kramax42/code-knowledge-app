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
import { CategoryValidationPipe } from 'src/pipes/category-validation.pipe';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { PaginationParams } from 'src/utils/pagination-params';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/question.dto';
import { QUESTION_NOT_FOUND_ERROR } from './questions.constants';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':category')
  async findAll(
  @Param('category', CategoryValidationPipe) category: string,
    @Query() { skip, limit }: PaginationParams,
  ) {
    return this.questionsService.findAll(category, skip, limit);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getCategoriesSizes() {
    const sizes = await this.questionsService.getCategoriesSizes();
    if (!sizes) {
      throw new NotFoundException(QUESTION_NOT_FOUND_ERROR);
    }
    return sizes;
  }

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateQuestionDto) {
    return this.questionsService.create(dto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const question = await this.questionsService.findById(id);
    if (!question) {
      throw new NotFoundException(QUESTION_NOT_FOUND_ERROR);
    }
    return question;
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedQuestion = await this.questionsService.deleteById(id);
    if (!deletedQuestion) {
      throw new NotFoundException(QUESTION_NOT_FOUND_ERROR);
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(
  @Param('id', IdValidationPipe) id: string,
    @Body() dto: UpdateQuestionDto,
  ) {
    const updatedQuestion = await this.questionsService.updateById(id, dto);
    if (!updatedQuestion) {
      throw new NotFoundException(QUESTION_NOT_FOUND_ERROR);
    }
    return updatedQuestion;
  }

  
}
