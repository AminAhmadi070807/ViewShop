import { Injectable } from '@nestjs/common';
import { WalletDto } from './dto/wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  charge(data: WalletDto) {
    return data;
  }

  findAll() {
    return `This action returns all wallet`;
  }

  payment(id: string) {
    return `This action returns a #${id} wallet`;
  }
}
