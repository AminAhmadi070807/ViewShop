import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Search } from './entities/search.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Search)
    private readonly searchRepository: Repository<Search>,
  ) {}

  findAll() {
    return `This action returns all search`;
  }

  search(search: string) {
    return `This action returns a #${search} search`;
  }

  remove(id: number) {
    return `This action removes a #${id} search`;
  }
}
