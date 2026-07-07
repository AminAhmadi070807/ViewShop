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

  async findAll() {
    const addresses: Address[] = await this.addressRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return {
      status: 200,
      message: statusMessages.fa['200'],
      body: addresses,
    };
  }

  async findOne(id: string) {
    try {
      const address: Address | null = await this.addressRepository.findOneBy({
        id,
      });

      if (!address) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: address,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    await this.addressRepository.delete(id);

    return {
      status: 204,
      message: statusMessages.fa['204'],
      body: null,
    };
  }
}
