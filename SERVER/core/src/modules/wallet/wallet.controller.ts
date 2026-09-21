import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WalletService } from './wallet.service';
import { WalletDto } from './dto/wallet.dto';
import { PageFilter } from '../../common/filters/page.filter';
import { Validate } from '../../common/validations/validate.dto';

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

  @MessagePattern('WALLET:ONE')
  findOne(@Payload() data: Validate) {
    return this.walletService.findOne(data);
  }
}
