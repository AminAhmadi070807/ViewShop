import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StoreService } from './store.service';
import { StoreDto, UpdateStoreDto } from './dto/store.dto';
import { Validate } from '../../common/validations/validate.dto';
import { PageFilter } from '../../common/filters/page.filter';

@Controller()
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @MessagePattern('STORE:CREATE')
  create(@Payload() data: StoreDto) {
    return this.storeService.create(data);
  }

  @MessagePattern('STORE:FIND')
  findAll(@Payload() data: PageFilter) {
    return this.storeService.findAll(data.page);
  }

  @MessagePattern('STORE:ONE')
  findOne(@Payload() data: Validate) {
    return this.storeService.findOne(data);
  }

  @MessagePattern('STORE:UPDATE')
  update(@Payload() data: UpdateStoreDto) {
    return this.storeService.update(data);
  }

  @MessagePattern('STORE:DELETE')
  delete(@Payload() data: Validate) {
    return this.storeService.delete(data.id);
  }
}
