import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Controller()
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @MessagePattern('createWallet')
  charging(@Payload() data: CreateWalletDto) {
    return this.walletsService.charging(data);
  }

  @MessagePattern('findAllWallets')
  findAll() {
    return this.walletsService.findAll();
  }

  @MessagePattern('findOneWallet')
  findOne(@Payload() id: number) {
    return this.walletsService.findOne(id);
  }
}
