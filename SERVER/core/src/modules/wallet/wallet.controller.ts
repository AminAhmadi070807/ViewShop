import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @MessagePattern('createWallet')
  create(@Payload() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @MessagePattern('findAllWallet')
  findAll() {
    return this.walletService.findAll();
  }

  @MessagePattern('findOneWallet')
  findOne(@Payload() id: number) {
    return this.walletService.findOne(id);
  }

  @MessagePattern('updateWallet')
  update(@Payload() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(updateWalletDto.id, updateWalletDto);
  }

  @MessagePattern('removeWallet')
  remove(@Payload() id: number) {
    return this.walletService.remove(id);
  }
}
