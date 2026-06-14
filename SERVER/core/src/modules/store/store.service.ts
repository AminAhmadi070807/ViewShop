import { Injectable } from '@nestjs/common';
import { StoreDto } from './dto/store.dto';

@Injectable()
export class StoreService {
  create(data: StoreDto) {
    return 'This action adds a new store';
  }

  findAll() {
    return `This action returns all store`;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }
}
