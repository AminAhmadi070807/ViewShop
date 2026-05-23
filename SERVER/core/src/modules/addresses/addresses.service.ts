import { Injectable } from '@nestjs/common';
import { AddressDto } from './dto/address.dto';

@Injectable()
export class AddressesService {
  create(createAddressDto: AddressDto) {
    return 'This action adds a new address';
  }

  findAll() {
    return `This action returns all addresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
