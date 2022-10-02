import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CategoriesService } from '../categories.service';

@ValidatorConstraint({ name: 'IsCategory', async: true })
@Injectable()
export class IsCategory implements ValidatorConstraintInterface {

  constructor(private readonly categoriesService: CategoriesService) { }

  public async validate(category: string, args: ValidationArguments) {
    const categories = await this.categoriesService.findAllCategories();
    return categories.includes(category);
  }
}