import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @MessagePattern('createSearch')
  create(@Payload() createSearchDto: SearchDto) {
    return this.searchService.create(createSearchDto);
  }

  @MessagePattern('findAllSearch')
  findAll() {
    return this.searchService.findAll();
  }

  @MessagePattern('findOneSearch')
  findOne(@Payload() id: number) {
    return this.searchService.findOne(id);
  }

  @MessagePattern('removeSearch')
  remove(@Payload() id: number) {
    return this.searchService.remove(id);
  }
}
