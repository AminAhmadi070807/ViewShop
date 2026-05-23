import { Injectable } from '@nestjs/common';
import { WalletDto } from './dto/wallet.dto';

@Injectable()
export class WalletService {
  charge(data: WalletDto) {}

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
