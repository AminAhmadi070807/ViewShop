import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { CreateWalletDto } from './wallet.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@ApiOkResponse({ description: statusMessages.fa.AUTH['200'] })
@ApiBadRequestResponse({ description: statusMessages.fa['400'] })
@ApiInternalServerErrorResponse({
  description: statusMessages.fa['500'],
})
@Controller('core/wallets')
export class WalletsController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  charging(@Body() data: CreateWalletDto) {
    return this.coreService.send('WALLET:CHARGER', data);
  }
}
