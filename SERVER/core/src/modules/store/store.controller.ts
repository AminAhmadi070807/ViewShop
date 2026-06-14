import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller()
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @MessagePattern('createStore')
  create(@Payload() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @MessagePattern('findAllStore')
  findAll() {
    return this.storeService.findAll();
  }

  @MessagePattern('findOneStore')
  findOne(@Payload() id: number) {
    return this.storeService.findOne(id);
  }

  @MessagePattern('updateStore')
  update(@Payload() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(updateStoreDto.id, updateStoreDto);
  }

  @MessagePattern('removeStore')
  remove(@Payload() id: number) {
    return this.storeService.remove(id);
  }
}
