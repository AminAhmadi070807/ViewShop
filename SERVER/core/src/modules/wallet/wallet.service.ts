import { Injectable } from '@nestjs/common';
import { WalletDto } from './dto/wallet.dto';

@Injectable()
export class WalletService {
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
