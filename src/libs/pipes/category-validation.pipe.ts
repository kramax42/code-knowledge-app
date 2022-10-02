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
    if (!categories.map(c => c.toLowerCase()).includes(value.toLowerCase())) {
      throw new BadRequestException(CATEGORY_VALIDATION_ERROR);
    }
    return value;
  }
}
