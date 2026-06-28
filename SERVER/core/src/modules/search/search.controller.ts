import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SearchService } from './search.service';
import { ValidateUUID } from '../../common/validations/id.dto';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @MessagePattern('SEARCH:FIND')
  findAll() {
    return this.searchService.findAll();
  }

  @MessagePattern('SEARCH:SEARCH')
  search(@Payload() search: string) {
    return this.searchService.search(search);
  }

  @MessagePattern('SEARCH:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.searchService.remove(data.id);
  }
}
