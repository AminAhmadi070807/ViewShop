import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { CreateWalletDto } from './wallet.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  charging(@Body() data: CreateWalletDto) {
    return this.coreService.send('WALLET:CHARGER', data);
  }
}
