import { Type } from 'class-transformer';
import {
  IsString,
  ValidateNested,
  IsArray,
  IsBoolean,
  IsOptional,
  Validate,
} from 'class-validator';

import { IsCategory } from '../../categories/validators/category.validator';


class AnswerDto {
  @IsString()
  answer: string;

  @IsBoolean()
  isCorrect: boolean;
}


export class CreateQuestionDto {
  @Validate(IsCategory, {
    message: 'Category should be valid string.'
  })
  category: string;

  @IsString()
  question: string;

  @IsString()
  @IsOptional()
  codeExample: string;

  @IsArray()
  @ValidateNested()
  @Type(() => AnswerDto)
  answers: AnswerDto[];

  @IsArray()
  @Type(() => String)
  tags: String[];
}

export class UpdateQuestionDto {
  @IsString()
  @IsOptional()
  category: string;

  @IsOptional()
  @IsString()
  question: string;

  @IsOptional()
  @IsString()
  codeExample: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => AnswerDto)
  answers: AnswerDto[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  tags: String[];
}
