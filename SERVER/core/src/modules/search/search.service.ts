import { Injectable } from '@nestjs/common';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class SearchService {
  create(data: SearchDto) {
    return 'This action adds a new search';
  }

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
