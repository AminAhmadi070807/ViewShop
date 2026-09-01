import { Controller, Get, Query, Req } from '@nestjs/common';
import { ZarinPalVerifyDto } from './zarin-pal.dto';
import express from 'express';
import { CoreService } from '../../../../core.service';
import { JwtPayload } from '../../../../../common/validation/jwt.dto';
import {
  ApiBadRequestResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiPaymentRequiredResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../../../common/messages/status.message';
import { PublicAccess } from '../../../../../common/decorators/public.access.decorator';

@Controller('core/payment/zarin-pal')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class ZarinPalController {
  constructor(private readonly coreService: CoreService) {}

  @Get('verify')
  @PublicAccess()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiPaymentRequiredResponse({ description: statusMessages.fa['402'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'PAYMENT', enum: ['PAYMENT'] },
    { name: 'permission', required: true, example: 'VERIFY', enum: ['VERIFY'] },
  ])
  verify(@Query() data: ZarinPalVerifyDto, @Req() req: express.Request) {
    const user = req.user as JwtPayload;

    return this.coreService.send('PAYMENT:VERIFY:ZARIN_PAL', {
      user: user.userId,
      key: data.Authority,
      status: data.Status,
    });
  }
}
