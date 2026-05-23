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

  async findOne(id: string) {}

  async remove(id: string) {}
}
