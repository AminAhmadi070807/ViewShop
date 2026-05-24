import { Injectable } from '@nestjs/common';
import { AddressDto } from './dto/address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: AddressDto) {
    const user: User | null = await this.userRepository.findOneBy({
      id: data.user,
    });

    if (!user) throw new CustomException(statusMessages.fa['404'], 404);

    const address: Address = this.addressRepository.create({
      user,
      street: data.street,
      city: data.city,
      address: data.address,
      province: data.province,
      postal_code: data.postal_code,
      alley: data.alley,
    });

    await this.addressRepository.save(address);

    return {
      status: 201,
      message: statusMessages.fa['201'],
      body: null,
    };
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
