import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WalletService } from './wallet.service';
import { WalletDto } from './dto/wallet.dto';
import { ValidateUUID } from '../../common/validations/uuid.dto';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @MessagePattern('WALLET:CHARGE')
  charge(@Payload() data: WalletDto) {
    return this.walletService.charge(data);
  }

  @MessagePattern('WALLET:FIND')
  findAll() {
    return this.walletService.findAll();
  }

  @MessagePattern('WALLET:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.walletService.findOne(data.id);
  }

  @MessagePattern('WALLET:PAYMENT')
  payment(@Payload() data: ValidateUUID) {
    return this.walletService.remove(data.id);
  }
}
