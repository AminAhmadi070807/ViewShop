import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import { GuardDto, ValidateGuard } from './guard.dto';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('guards/guard')
export class GuardController {
  constructor(private readonly guardsService: GuardsService) {}
  @Post()
  create(@Body() data: GuardDto) {
    return this.guardsService.send('GUARD:CREATE', data);
  }

  @Get()
  findAll() {
    return this.guardsService.send('GUARD:FIND');
  }

  @Get('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id of Guard',
    required: true,
  })
  findOne(@Param() data: ValidateUUID) {
    return this.guardsService.send('GUARD:ONE', data);
  }

  @Post('validate')
  validate(@Body() data: ValidateGuard, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;
    return this.guardsService.send('GUARD:VALIDATE', {
      userId: user.userId,
      patch: data.patch,
    });
  }
}
