import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WalletService } from './wallet.service';
import { WalletDto } from './dto/wallet.dto';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @MessagePattern('createWallet')
  charge(@Payload() data: WalletDto) {
    return this.walletService.charge(data);
  }

  @MessagePattern('findAllWallet')
  findAll() {
    return this.walletService.findAll();
  }

  @MessagePattern('findOneWallet')
  findOne(@Payload() id: string) {
    return this.walletService.findOne(id);
  }

  @MessagePattern('removeWallet')
  payment(@Payload() id: string) {
    return this.walletService.remove(id);
  }
}
