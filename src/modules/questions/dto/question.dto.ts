import { Type } from 'class-transformer';
import {
  IsString,
  ValidateNested,
  IsArray,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';

class AnswerDto {
  @IsString()
  answer: string;

  @IsBoolean()
  isCorrect: boolean;
}

export enum Categories {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  NODEJS =     'nodejs',
}

export class CreateQuestionDto {
  @IsEnum(Categories)
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
}
