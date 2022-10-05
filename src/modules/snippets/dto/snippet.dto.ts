import { Type } from 'class-transformer';
import {
  IsString,
  ValidateNested,
  IsArray,
  IsBoolean,
  IsOptional,
  Validate,
} from 'class-validator';
import { IsCategory } from 'src/libs/validators/category.validator';



export class CreateSnippetDto {
  @Validate(IsCategory, {
    message: 'Category should be valid string.'
  })
  category: string;

  @IsString()
  snippet: string;

  @IsString()
  description: string;

  @IsArray()
  @Type(() => String)
  tags: string[];
}

export class UpdateSnippetDto {
  @IsOptional()
  @Validate(IsCategory, {
    message: 'Category should be valid string.'
  })
  category: string;

  @IsOptional()
  @IsString()
  snippet: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  tags: string[];
}