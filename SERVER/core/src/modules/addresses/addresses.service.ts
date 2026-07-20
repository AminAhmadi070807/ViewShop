import { Injectable } from '@nestjs/common';
import { AddressDto } from './dto/address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(data: AddressDto) {
    try {
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

  async findAll() {
    try {
      const addresses = await this.addressRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: addresses,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const address = await this.addressRepository.findOneBy({ id });

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

  async findOneByUserId(userId: string) {
    try {
      const address = await this.addressRepository.find({
        where: {
          user: { id: userId },
        },
        order: {
          createdAt: 'DESC',
        },
      });

      if (!address.length) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

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
    try {
      const result: DeleteResult = await this.addressRepository.delete(id);

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
