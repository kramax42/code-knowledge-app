import { Type } from 'class-transformer';
import {
  IsString,
  ValidateNested,
  IsArray,
  IsBoolean,
  IsOptional,
} from 'class-validator';

class AnswerDto {
  @IsString()
  answer: string;

  @IsBoolean()
  isCorrect: boolean;
}

export class CreateQuestionDto {
  @IsString()
  category: string;

  @IsString()
  question: string;

  @IsString()
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
