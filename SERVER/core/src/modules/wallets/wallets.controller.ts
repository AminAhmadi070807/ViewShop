import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller()
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @MessagePattern('createWallet')
  create(@Payload() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @MessagePattern('findAllWallets')
  findAll() {
    return this.walletsService.findAll();
  }

  @MessagePattern('findOneWallet')
  findOne(@Payload() id: number) {
    return this.walletsService.findOne(id);
  }

  @MessagePattern('updateWallet')
  update(@Payload() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(updateWalletDto.id, updateWalletDto);
  }

  @MessagePattern('removeWallet')
  remove(@Payload() id: number) {
    return this.walletsService.remove(id);
  }
}
