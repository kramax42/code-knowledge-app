import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CategoriesService } from 'src/modules/categories/categories.service';
import { CATEGORY_VALIDATION_ERROR } from './validation.constants';

@Injectable()
export class CategoryValidationPipe implements PipeTransform {

  constructor(private readonly categoriesService: CategoriesService) { }

  async transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type != 'param') {
      return value;
    }

    const categories = await this.categoriesService.findAllCategories();

    const objVal = Object.values(categories).find(c => c.categoryURLName == value);
    if (!objVal) {
      throw new BadRequestException(CATEGORY_VALIDATION_ERROR);
    }
    const objKey = Object.keys(categories).find(key => categories[key].categoryURLName === objVal.categoryURLName);

    return objKey;
  }
}
