import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
// import { HeroRepository } from '../../repository/hero.repository';
import { GetHeroesQuery } from '../impl';

@QueryHandler(GetHeroesQuery)
export class GetHeroesHandler implements IQueryHandler<GetHeroesQuery> {
  //   constructor(private readonly repository: HeroRepository) {}
  //   constructor() {}

  async execute(query: GetHeroesQuery) {
    // console.log(clc.yellowBright('Async GetHeroesQuery...'));
    // return this.repository.findAll();
    return 'heroes query';
  }
}
