import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { PaymentDto, VerifyPaymentDto } from './payment.dto';
import express from 'express';
import { CoreService } from '../../../../core.service';
import { JwtPayload } from '../../../../../common/validation/jwt.dto';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiPaymentRequiredResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../../../common/messages/status.message';

@Controller('core/payment/zarin-pal')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class ZarinPalController {
  constructor(private readonly coreService: CoreService) {}

  @Post('pay')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiPaymentRequiredResponse({ description: statusMessages.fa['402'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'PAYMENT', enum: ['PAYMENT'] },
    {
      name: 'permission',
      required: true,
      example: 'PAYMENT',
      enum: ['PAYMENT'],
    },
  ])
  payment(@Body() data: PaymentDto, @Req() req: express.Request) {
    const user = req.user as JwtPayload;

    return this.coreService.send('PAYMENT:ZARIN_PAL', {
      user: user.userId,
      ...data,
    });
  }

  @Get('verify')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiPaymentRequiredResponse({ description: statusMessages.fa['402'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'PAYMENT', enum: ['PAYMENT'] },
    { name: 'permission', required: true, example: 'VERIFY', enum: ['VERIFY'] },
  ])
  verify(@Query() data: VerifyPaymentDto, @Req() req: express.Request) {
    const user = req.user as JwtPayload;

    return this.coreService.send('PAYMENT:ZARIN_PAL:VERIFY', {
      user: user.userId,
      ...data,
    });
  }
}
