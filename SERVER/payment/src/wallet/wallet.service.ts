import { Injectable } from '@nestjs/common';
import { WalletDto } from './dto/wallet.dto';
import { CustomException } from '../common/exceptions/custom.exception.error';
import { statusMessages } from '../common/messages/status.message';
import { Wallet } from './entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  async charge(data: WalletDto) {
    try {
      const wallet: Wallet | null = await this.walletRepository.findOneBy({
        user: data.userId,
      });

      if (!wallet) {
        const newWallet: Wallet = this.walletRepository.create({
          amount: data.amount,
          user: data.userId,
          payments: []
        });

        await this.walletRepository.save(newWallet);
      } else {
        wallet.amount = Number(data.amount) + Number(wallet.amount);

        await this.walletRepository.save(wallet);
      }

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['402'], 402);
    }
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
