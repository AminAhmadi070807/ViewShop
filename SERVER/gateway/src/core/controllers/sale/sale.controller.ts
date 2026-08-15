import { Controller, Get } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/sales')
export class SaleController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['500'] })
  findAll() {
    return this.coreService.send('SALES:FIND');
  }
}
