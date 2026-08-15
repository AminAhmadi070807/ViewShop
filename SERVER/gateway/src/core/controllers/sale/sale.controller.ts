import { Controller, Get } from '@nestjs/common';
import { CoreService } from '../../core.service';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

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
}
