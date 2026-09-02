import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
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
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../../common/messages/status.message';

@Controller('core/settings/payment')
@ApiBadRequestResponse({ description: statusMessages.fa['400'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class PaymentSettingController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  create(@Body() data: PaymentSettingDto) {
    return this.coreService.send('SETTING:PAYMENT:CREATE', data);
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.coreService.send('SETTING:PAYMENT:FIND');
  }

  @Get(':id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('SETTING:PAYMENT:ONE', data);
  }

  @Patch()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  update(@Body() data: UpdatePaymentSettingDto) {
    return this.coreService.send('SETTING:PAYMENT:UPDATE', data);
  }

  @Put()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  updateStatus(@Body() data: ValidateUUID) {
    return this.coreService.send('SETTING:PAYMENT:UPDATE:STATUS', data);
  }

  @Delete()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  remove(@Body() data: ValidateUUID) {
    return this.coreService.send('SETTING:PAYMENT:DELETE', data);
  }
}
