import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { WalletDto } from './wallet.dto';

@Controller('core/wallet')
export class WalletController {
  constructor(private readonly coreService: CoreService) {}

  @Post('charge')
  charge(@Body() data: WalletDto) {
    return this.coreService.send('WALLET:CHARGE', data);
  }
}
