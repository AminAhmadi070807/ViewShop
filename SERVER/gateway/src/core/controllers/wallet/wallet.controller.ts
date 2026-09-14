import { Body, Controller, Get, Post, Req } from '@nestjs/common';
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
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';

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
    { name: 'feature', required: true, example: 'WALLET', enum: ['WALLET'] },
    { name: 'permission', required: true, example: 'CHARGE', enum: ['CHARGE'] },
  ])
  charge(@Body() data: WalletDto, @Req() req: express.Request) {
    const user = req.user as JwtPayload;

    return this.coreService.send('WALLET:CHARGE', {
      amount: data.amount,
      user: user.userId,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'WALLET', enum: ['WALLET'] },
    { name: 'permission', required: true, example: 'READ', enum: ['READ'] },
  ])
  findAll() {
    return this.coreService.send('WALLET:FIND');
  }
}
