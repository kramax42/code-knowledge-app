import { Type } from 'class-transformer';
import {
  IsString,
  ValidateNested,
  IsArray,
  IsOptional,
  Validate,
} from 'class-validator';
import { IsCategory } from 'src/libs/validators/category.validator';
import { AnswerDto } from './answer.dto';
import { InfoLinkDto } from './info-link.dto';

export class CreateQuestionDto {
  @Validate(IsCategory, {
    message: 'Category should be valid string.',
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
  tags: string[];

  @IsArray()
  @ValidateNested()
  @Type(() => InfoLinkDto)
  infoLinks: InfoLinkDto[];
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
  tags: string[];

  @IsArray()
  @ValidateNested()
  @Type(() => InfoLinkDto)
  infoLinks: InfoLinkDto[];
}
