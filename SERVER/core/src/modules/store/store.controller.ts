import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StoreService } from './store.service';
import { StoreDto } from './dto/store.dto';

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
  findOne(@Payload() id: number) {
    return this.storeService.findOne(id);
  }
}
