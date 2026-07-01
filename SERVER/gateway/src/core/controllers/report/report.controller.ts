import { Body, Controller, Post, Req } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { ReportDto } from './report.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';

@Controller('core/report')
export class ReportController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: ReportDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('REPORT:CREATE', {
      user: user.userId,
      ...data,
    });
  }
}
