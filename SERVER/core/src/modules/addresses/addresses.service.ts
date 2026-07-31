import { Injectable } from '@nestjs/common';
import { AddressDto } from './dto/address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { Validate } from '../../common/validations/validate.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(data: AddressDto) {
    try {
      const numberOfUserAddress = await this.addressRepository.count({
        where: { user: { id: data.user } },
      });

      if (numberOfUserAddress > 5) {
        return new CustomException(statusMessages.fa['429'], 429);
      }

      const address: Address = this.addressRepository.create({
        user: { id: data.user },
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
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll(data: Validate) {
    try {
      const result = await this.addressRepository.find({
        where: { user: { id: data.user } },
        order: { createdAt: 'DESC' },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(data: Validate) {
    try {
      const address = await this.addressRepository.findOneBy({
        id: data.id,
        user: { id: data.user },
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

  async remove(data: Validate) {
    try {
      const result = await this.addressRepository.delete({
        id: data.id,
        user: { id: data.user },
      });

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return {
        status: 204,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
