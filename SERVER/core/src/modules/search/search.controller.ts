import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @MessagePattern('SEARCH:CREATE')
  create(@Payload() createSearchDto: SearchDto) {
    return this.searchService.create(createSearchDto);
  }

  @MessagePattern('SEARCH:FIND')
  findAll() {
    return this.searchService.findAll();
  }

  @MessagePattern('SEARCH:SEARCH')
  search(@Payload() search: string) {
    return this.searchService.search(search);
  }

  @MessagePattern('SEARCH:DELETE')
  remove(@Payload() id: number) {
    return this.searchService.remove(id);
  }
}
