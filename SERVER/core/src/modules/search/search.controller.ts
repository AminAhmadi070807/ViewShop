import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SearchService } from './search.service';
import { Validate } from '../../common/validations/validate.dto';
import { PageFilter } from '../../common/filters/page.filter';
import { ProductFilterDto } from './dto/search.dto';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @MessagePattern('SEARCH:FIND')
  findAll(@Payload() data: PageFilter) {
    return this.searchService.findAll(data.page);
  }

  @MessagePattern('SEARCH:SEARCH')
  search(@Payload() data: ProductFilterDto) {
    return this.searchService.search(data);
  }

  @MessagePattern('SEARCH:DELETE')
  remove(@Payload() data: Validate) {
    return this.searchService.remove(data.id);
  }
}
