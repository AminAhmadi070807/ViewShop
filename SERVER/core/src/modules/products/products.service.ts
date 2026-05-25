import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }
}
