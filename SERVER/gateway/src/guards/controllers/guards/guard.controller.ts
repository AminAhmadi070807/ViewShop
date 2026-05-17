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
import { GuardDto, ValidateGuard, ValidateOkResult } from './guard.dto';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { statusMessages } from '../../../common/messages/status.message';
import { Public } from '../../../common/decorators/public.decorator';

@Controller('guards/guard')
@ApiForbiddenResponse({ description: statusMessages.fa['403'] })
@ApiNotFoundResponse({ description: statusMessages.fa['404'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class GuardController {
  constructor(private readonly guardsService: GuardsService) {}

  @Public()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @Post()
  create(@Body() data: GuardDto): Observable<any> {
    return this.guardsService.send('GUARD:CREATE', data);
  }

  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @Get()
  findAll(): Observable<any> {
    return this.guardsService.send('GUARD:FIND');
  }

  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @Get('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id of Guard',
    required: true,
  })
  findOne(@Param() data: ValidateUUID): Observable<any> {
    return this.guardsService.send('GUARD:ONE', data);
  }

  @ApiOkResponse({
    description: statusMessages.fa['200'],
    type: ValidateOkResult,
  })
  @Post('validate')
  validate(
    @Body() data: ValidateGuard,
    @Req() req: express.Request,
  ): Observable<any> {
    const user: JwtPayload = req.user as JwtPayload;
    return this.guardsService.send('GUARD:VALIDATE', {
      userId: user.userId,
      patch: data.patch,
      service: data.service,
    });
  }

  @ApiOkResponse({
    description: statusMessages.fa['200'],
    type: ValidateOkResult,
  })
  @Delete('/:id')
  remove(@Param() data: ValidateUUID): Observable<any> {
    return this.guardsService.send('GUARD:DELETE', data);
  }
}
