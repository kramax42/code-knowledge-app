import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { categories } from 'src/constants/categories.constants';
import { CATEGORY_VALIDATION_ERROR } from './validation.constants';

@Injectable()
export class CategoryValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type != 'param') {
      return value;
    }

    if (!categories.includes(value)) {
      throw new BadRequestException(CATEGORY_VALIDATION_ERROR);
    }
    return value;
  }
}
