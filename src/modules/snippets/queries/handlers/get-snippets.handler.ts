import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSnippetsQuery } from '../impl';
import { SnippetsService } from '../../snippets.service';

@QueryHandler(GetSnippetsQuery)
export class GetSnippetsHandler implements IQueryHandler<GetSnippetsQuery> {
  constructor(private readonly snippetsService: SnippetsService) {}

  async execute({ category, skip, limit }: GetSnippetsQuery) {
    return this.snippetsService.findAll(category, skip, limit);
  }
}
