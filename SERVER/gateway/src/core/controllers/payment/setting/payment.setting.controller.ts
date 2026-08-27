import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoreService } from '../../../core.service';
import {
  PaymentSettingDto,
  UpdatePaymentSettingDto,
} from './payment.setting.dto';
import { ValidateUUID } from '../../../../common/validation/uuid.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../../common/messages/status.message';

@Controller('core/payment/setting')
@ApiBadRequestResponse({ description: statusMessages.fa['400'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class PaymentSettingController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  create(@Body() data: PaymentSettingDto) {
    return this.coreService.send('PAYMENT:SETTING:CREATE', data);
  }

  @Get()
  findAll() {
    return this.coreService.send('PAYMENT:SETTING:FIND');
  }

  @Get(':id')
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('PAYMENT:SETTING:ONE', data);
  }

  @Patch()
  update(@Body() data: UpdatePaymentSettingDto) {
    return this.coreService.send('PAYMENT:SETTING:UPDATE', data);
  }

  @Delete()
  remove(@Body() data: ValidateUUID) {
    return this.coreService.send('PAYMENT:SETTING:DELETE', data);
  }
}
