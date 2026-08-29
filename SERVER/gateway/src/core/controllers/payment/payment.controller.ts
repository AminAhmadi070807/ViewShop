import { Body, Controller, Post, Req } from '@nestjs/common';
import express from 'express';
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
import { CoreService } from '../../core.service';
import { statusMessages } from '../../../common/messages/status.message';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import { PaymentDto } from './payment.dto';

@Controller('core/payment')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class PaymentController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
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
}
