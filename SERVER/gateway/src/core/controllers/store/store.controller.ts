import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoreService } from '../../core.service';
import { StoreDto, UpdateStoreDto } from './store.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';

@Controller('core/store')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
export class StoreController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  create(@Body() data: StoreDto) {
    return this.coreService.send('STORE:CREATE', data);
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.coreService.send('STORE:FIND');
  }

  @Get('/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('STORE:ONE', data);
  }

  @Patch()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  update(@Body() data: UpdateStoreDto) {
    return this.coreService.send('STORE:UPDATE', data);
  }

  @Delete('/:id')
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  delete(@Param() data: ValidateUUID) {
    return this.coreService.send('STORE:DELETE', data);
  }
}
