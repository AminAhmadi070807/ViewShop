import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WalletService } from './wallet.service';
import { WalletDto } from './dto/wallet.dto';
import { PageFilter } from '../../common/filters/page.filter';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @MessagePattern('WALLET:CHARGE')
  charge(@Payload() data: WalletDto) {
    return this.walletService.charge(data);
  }

  @MessagePattern('WALLET:FIND')
  findAll(@Payload() data: PageFilter) {
    return this.walletService.findAll(data.page);
  }
}
