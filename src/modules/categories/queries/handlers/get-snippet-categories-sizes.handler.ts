import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSnippetCategoriesSizesQuery } from '../impl';
import { CategoriesService } from '../../categories.service';

@QueryHandler(GetSnippetCategoriesSizesQuery)
export class GetSnippetCategoriesSizesHandler
  implements IQueryHandler<GetSnippetCategoriesSizesQuery>
{
  constructor(private readonly categoriesService: CategoriesService) {}

  async execute() {
    return this.categoriesService.getSnippetCategoriesSizes();
  }
}
