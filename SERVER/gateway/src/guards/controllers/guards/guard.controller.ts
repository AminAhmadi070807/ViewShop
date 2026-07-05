import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import { GuardDto, ValidateGuard } from './guard.dto';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('guards/guard')
@ApiForbiddenResponse({ description: statusMessages.fa['403'] })
@ApiNotFoundResponse({ description: statusMessages.fa['404'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class GuardController {
  constructor(private readonly guardsService: GuardsService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  create(@Body() data: GuardDto): Observable<any> {
    return this.guardsService.send('GUARD:CREATE', data);
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll(): Observable<any> {
    return this.guardsService.send('GUARD:FIND');
  }

  @Get('/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id of Guard',
    required: true,
  })
  findOne(@Param() data: ValidateUUID): Observable<any> {
    return this.guardsService.send('GUARD:ONE', data);
  }

  @Post('validate')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  validate(
    @Body() data: ValidateGuard,
    @Req() req: express.Request,
  ): Observable<any> {
    const user: JwtPayload = req.user as JwtPayload;
    return this.guardsService.send('GUARD:VALIDATE', {
      userId: user.userId,
      service: data.service,
    });
  }

  @ApiNoContentResponse({
    description: statusMessages.fa['204'],
  })
  @Delete('/:id')
  remove(@Param() data: ValidateUUID): Observable<any> {
    return this.guardsService.send('GUARD:DELETE', data);
  }
}
