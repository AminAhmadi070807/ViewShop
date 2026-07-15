import { Injectable } from '@nestjs/common';
import { WalletDto } from './dto/wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  async charge(data: WalletDto) {
    try {
      const existing = await this.walletRepository.findOneBy({
        user: {
          id: data.user,
        },
      });

      if (existing) {
        existing.amount = +existing.amount + +data.amount;

        await this.walletRepository.save(existing);

        return {
          status: 200,
          message: statusMessages.fa['200'],
          body: null,
        };
      }

      const wallet = this.walletRepository.create({
        amount: +data.amount,
        user: {
          id: data.user,
        },
      });

      await this.walletRepository.save(wallet);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const wallets = await this.walletRepository.find({
        relations: ['user'],
        select: {
          user: {
            id: true,
            fullName: true,
            role: true,
            phone: true,
          },
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: wallets,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async payment(data: WalletDto) {}
}
