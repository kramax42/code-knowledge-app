import { Type } from 'class-transformer';
import {
  IsString,
  ValidateNested,
  IsArray,
  IsOptional,
  Validate,
} from 'class-validator';
import { IsCategory } from 'src/libs/validators/category.validator';

class InfoLinkDto {
  @IsString()
  link: string;

  @IsString()
  description: string;
}


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

  @IsArray()
  @ValidateNested()
  @Type(() => InfoLinkDto)
  infoLinks: InfoLinkDto[];
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

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => InfoLinkDto)
  infoLinks: InfoLinkDto[];
}