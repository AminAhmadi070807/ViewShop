import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import bcrypt from 'bcrypt';
import { statusMessages } from '../../common/message/message.status';
import { Validate } from '../../common/validations/validate.dto';
import { Wallet } from '../wallet/entities/wallet.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  async create(data: CreateUserDto) {
    try {
      const existing = await this.userRepository.findOneBy({
        phone: data.phone,
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const user = this.userRepository.create({
        phone: data.phone,
        password: bcrypt.hashSync(data.password, 12),
        fullName: data.fullName,
      });

      await this.userRepository.save(user);

      const wallet = this.walletRepository.create({
        user,
        amount: 0,
        details: [],
      });

      await this.walletRepository.save(wallet);

      return { status: 201, message: statusMessages.fa['201'], body: user };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll(page: number = 1) {
    try {
      const user = await this.userRepository.find({
        take: (page ?? 1) * 15,
        order: { createdAt: 'DESC' },
        select: { password: false },
      });

      return { status: 200, message: statusMessages.fa['200'], body: user };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(data: Validate) {
    try {
      const user = await this.userRepository.findOneBy({ id: data.id });

      if (!user) return new CustomException(statusMessages.fa['404'], 404);

      return { status: 200, message: statusMessages.fa['200'], body: user };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateUserDto) {
    try {
      const existing = await this.userRepository.findOneBy({ id: data.id });

      if (!existing) return new CustomException(statusMessages.fa['404'], 404);

      if (existing.id !== data.user) {
        return new CustomException(statusMessages.fa['403'], 403);
      }

      existing.fullName = data.fullName;

      await this.userRepository.save(existing);

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
