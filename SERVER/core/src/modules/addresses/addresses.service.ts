import { Injectable } from '@nestjs/common';
import { AddressDto } from './dto/address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly userService: UsersService,
  ) {}

  async create(data: AddressDto) {
    const user = await this.userService.findOne(data)
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
