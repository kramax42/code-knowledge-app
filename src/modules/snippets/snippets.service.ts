import { Injectable } from '@nestjs/common';
import { CreateSnippetDto, UpdateSnippetDto } from '../../dtos/snippet.dto';
import { SnippetsRepository } from './snippets.repository';

@Injectable()
export class SnippetsService {
  constructor(
    private readonly snippetRepository: SnippetsRepository,
    // private commandBus: CommandBus,
  ) {}

  // async killDragon(heroId: string, killDragonDto: KillDragonDto) {
  //   return this.commandBus.execute(
  //     new KillDragonCommand(heroId, killDragonDto.dragonId)
  //   );
  // }

  async findAll(category: string, skip = 0, limit?: number) {
    return this.snippetRepository.findAll(category, skip, limit);
  }

  async create(dto: CreateSnippetDto) {
    this.snippetRepository.create(dto);
  }

  async findById(id: string) {
    return this.snippetRepository.findById(id);
  }

  async deleteById(id: string) {
    return this.snippetRepository.deleteById(id);
  }

  async updateById(id: string, dto: UpdateSnippetDto) {
    return this.snippetRepository.updateById(id, dto);
  }
}
