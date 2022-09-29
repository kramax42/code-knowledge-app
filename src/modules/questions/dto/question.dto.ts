import { Type } from 'class-transformer';
import {
  IsString,
  ValidateNested,
  IsArray,
  IsBoolean,
  IsOptional,
  IsEnum,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
} from 'class-validator';
import { categories } from 'src/libs/constants/categories.constants';

class AnswerDto {
  @IsString()
  answer: string;

  @IsBoolean()
  isCorrect: boolean;
}

@ValidatorConstraint()
export class IsCategory implements ValidatorConstraintInterface {
  public async validate(category: string, args: ValidationArguments) {
    return categories.includes(category);
  }
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
