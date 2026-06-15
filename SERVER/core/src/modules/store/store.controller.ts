import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StoreService } from './store.service';
import { StoreDto, UpdateStoreDto } from './dto/store.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

@Controller()
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @MessagePattern('STORE:CREATE')
  create(@Payload() data: StoreDto) {
    return this.storeService.create(data);
  }

  @MessagePattern('STORE:FIND')
  findAll() {
    return this.storeService.findAll();
  }

  @MessagePattern('STORE:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.storeService.findOne(data.id);
  }

  @MessagePattern('STORE:UPDATE')
  update(@Payload() data: UpdateStoreDto) {
    return this.storeService.update(data);
  }
}
