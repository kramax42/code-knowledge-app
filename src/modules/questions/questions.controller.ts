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
import { Roles } from 'src/libs/decorators/roles.decorator';
import { RolesGuard } from 'src/libs/guards/roles.guard';
import { CategoryValidationPipe } from 'src/libs/pipes/category-validation.pipe';
import { IdValidationPipe } from 'src/libs/pipes/id-validation.pipe';
import {
  PaginationParamsDto,
  RandomQuestionsDto,
} from 'src/libs/utils/pagination-params';
import { Role } from 'src/models/user.model';
import { JwtAuthGuard } from '../../libs/guards/jwt.guard';
import { CreateQuestionDto, UpdateQuestionDto } from '../../dtos/question.dto';
import { QUESTION_NOT_FOUND_ERROR } from './questions.constants';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get(':category')
  async findAll(
    @Param('category', CategoryValidationPipe) category: string,
    @Query() { skip, limit }: PaginationParamsDto,
  ) {
    return this.questionsService.findAll(category, skip, limit);
  }

  @Get('random/:category')
  async findRandom(
    @Param('category', CategoryValidationPipe) category: string,
    @Query() { limit }: RandomQuestionsDto,
  ) {
    return this.questionsService.findRandom(category, limit);
  }

  @Get()
  async getCategoriesSizes() {
    const sizes = await this.questionsService.getCategoriesSizes();
    if (!sizes) {
      throw new NotFoundException(QUESTION_NOT_FOUND_ERROR);
    }
    return sizes;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: CreateQuestionDto) {
    const createdQuestion = await this.questionsService.create(dto);
    return createdQuestion;
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const question = await this.questionsService.findById(id);
    if (!question) {
      throw new NotFoundException(QUESTION_NOT_FOUND_ERROR);
    }
    return question;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedQuestion = await this.questionsService.deleteById(id);
    if (!deletedQuestion) {
      throw new NotFoundException(QUESTION_NOT_FOUND_ERROR);
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
