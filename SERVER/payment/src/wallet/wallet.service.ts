import { Injectable } from '@nestjs/common';
import { WalletDto } from './dto/wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentService } from '../modules/payment/payment.service';
import { PaymentModelEnum } from '../common/interfaces/payment.interface';
import { statusMessages } from '../common/messages/status.message';
import { CustomException } from '../common/exceptions/custom.exception.error';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    private readonly paymentService: PaymentService,
  ) {}

  async charge(data: WalletDto) {
    let result;

    switch (data.IPG) {
      case PaymentModelEnum.ZARIN_PAL: {
        result = await this.paymentService.zarinPal({
          user: data.userId,
          amount: data.amount,
          description: 'پرداخت به کیف پول کاربر',
        });
        break;
      }
      case PaymentModelEnum.ZIBAL: {
        result = await this.paymentService.zibal({
          user: data.userId,
          amount: data.amount,
          description: 'پرداخت به کیف پول کاربر',
        });
        break;
      }
      default: {
        result = {
          status: 400,
          message: 'نوسع سرویس پرداخت نادرست است',
          body: null,
        };
      }
    }

    return result;
  }

  async findAll() {
    try {
      const wallets: Wallet[] = await this.walletRepository.find({
        relations: ['payments'],
        select: {
          amount: true,
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

  async findOne(id: string) {
    try {
      const wallet: Wallet | null = await this.walletRepository.findOne({
        where: {
          id,
        },
        relations: ['payments'],
        select: {
          amount: true,
        },
      });

      if (!wallet) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: wallet,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      await this.walletRepository.delete(id);

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
