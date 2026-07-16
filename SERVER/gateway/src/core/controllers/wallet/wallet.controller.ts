import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { WalletDto } from './wallet.dto';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/wallet')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class WalletController {
  constructor(private readonly coreService: CoreService) {}

  @Post('charge')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'WALLET',
      enum: ['WALLET'],
    },
    {
      name: 'permission',
      required: true,
      example: 'CHARGE',
      enum: ['CHARGE'],
    },
  ])
  charge(@Body() data: WalletDto) {
    return this.coreService.send('WALLET:CHARGE', data);
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  findAll() {
    return this.coreService.send('WALLET:FIND');
  }
}
