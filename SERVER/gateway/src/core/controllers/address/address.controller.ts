import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { statusMessages } from '../../../common/messages/status.message';
import { AddressDto } from './address.dto';

@ApiOkResponse({ description: statusMessages.fa['200'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
@Controller('core/addresses')
export class AddressController {
  constructor(private readonly coreService: CoreService) {}

  // send request to create user in core microservice
  @Post()
  @ApiCreatedResponse({
    description: statusMessages.fa['201'],
  })
  @ApiConflictResponse({ description: statusMessages.fa['404'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  create(@Body() data: AddressDto): Observable<unknown> {
    return this.coreService.send('ADDRESS:CREATE', data);
  }

  // send request to find all in core microservice
  @Get()
  findAll(): Observable<unknown> {
    return this.coreService.send('ADDRESS:FIND');
  }

  // send request to find one user in core microservice
  @Get(':id')
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiOperation({ description: 'دریافت کاربر با ایدی' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'ایدی کاربر',
  })
  findOne(@Param() data: ValidateUUID): Observable<unknown> {
    return this.coreService.send('ADDRESS:USER', data);
  }

  // send request to remove user with userId in core microservice
  @Delete('delete/:id')
  @ApiOperation({ description: 'حذف کاربر با ایدی' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'uuid',
    description: 'ایدی کاربر',
  })
  delete(@Param() data: ValidateUUID): Observable<unknown> {
    return this.coreService.send('ADDRESS:DELETE', data);
  }
}
