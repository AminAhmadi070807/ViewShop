import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

@Controller()
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @MessagePattern('WALLET:CHARGER')
  charging(@Payload() data: CreateWalletDto) {
    return this.walletsService.charging(data);
  }

  @MessagePattern('WALLET:FIND')
  findAll() {
    return this.walletsService.findAll();
  }

  @MessagePattern('WALLET:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.walletsService.findOne(data.id);
  }
}
