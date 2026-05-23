import { Injectable } from '@nestjs/common';
import { WalletDto } from './dto/wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentService } from '../modules/payment/payment.service';
import { PaymentModelEnum } from '../common/interfaces/payment.interface';

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

  findAll() {
    return `This action returns all wallet`;
  }

  findOne(id: string) {
    return `This action returns a #${id} wallet`;
  }

  remove(id: string) {
    return `This action removes a #${id} wallet`;
  }
}
