import { Controller, Get, Param, Req } from '@nestjs/common';
import { CoreService } from '../../core.service';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import { ValidateUUID } from '../../../common/validation/uuid.dto';

@Controller('core/sales')
@ApiOkResponse({ description: statusMessages.fa['200'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiForbiddenResponse({ description: statusMessages.fa['403'] })
@ApiBadRequestResponse({ description: statusMessages.fa['500'] })
export class SaleController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  findAll() {
    return this.coreService.send('SALES:FIND');
  }

  @Get(':id')
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  findStoreSales(@Param() data: ValidateUUID, @Req() req: express.Request) {
    const user = req.user as JwtPayload;

    return this.coreService.send('SALES:FIND:STORE', {
      user: user.userId,
      id: data.id,
    });
  }
}
