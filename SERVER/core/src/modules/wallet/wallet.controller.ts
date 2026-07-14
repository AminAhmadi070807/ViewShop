import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WalletService } from './wallet.service';
import { WalletDto } from './dto/wallet.dto';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @MessagePattern('WALLET:CHARGE')
  create(@Payload() data: WalletDto) {
    return this.walletService.create(data);
  }

  @MessagePattern('WALLET:FIND')
  findAll() {
    return this.walletService.findAll();
  }

  @MessagePattern('WALLET:PAYMENT')
  payment(@Payload() id: string) {
    return this.walletService.payment(id);
  }
}
