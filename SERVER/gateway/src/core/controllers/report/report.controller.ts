import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { AnswerReportDto, ReportDto } from './report.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';

@Controller('core/report')
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class ReportController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  create(@Body() data: ReportDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('REPORT:CREATE', {
      user: user.userId,
      ...data,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  findAll() {
    return this.coreService.send('REPORT:FIND');
  }

  @Get('/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('REPORT:ONE', data);
  }

  @Patch()
  answer(@Body() data: AnswerReportDto) {
    return this.coreService.send('REPORT:ANSWER', data);
  }
}
