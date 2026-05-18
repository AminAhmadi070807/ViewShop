import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { CreateWalletDto } from './wallet.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';

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

  @Get()
  findAll() {
    return this.coreService.send('WALLET:FIND');
  }

  @Get('/:id')
  findOne(@Param('id') data: ValidateUUID) {
    return this.coreService.send('WALLET:ONE', data);
  }
}
