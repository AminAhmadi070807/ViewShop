import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CoreService } from '../../core.service';
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
import { Observable } from 'rxjs';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { statusMessages } from '../../../common/messages/status.message';
import { AddressDto } from './address.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';

@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
@Controller('core/addresses')
export class AddressController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  create(
    @Body() data: AddressDto,
    @Req() req: express.Request,
  ): Observable<unknown> {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('ADDRESS:CREATE', {
      user: user.userId,
      ...data,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll(): Observable<unknown> {
    return this.coreService.send('ADDRESS:FIND');
  }

  @Get('/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  findOne(@Param() data: ValidateUUID): Observable<unknown> {
    return this.coreService.send('ADDRESS:ONE', data);
  }

  @Delete()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  delete(@Body() data: ValidateUUID): Observable<unknown> {
    return this.coreService.send('ADDRESS:DELETE', data);
  }
}
