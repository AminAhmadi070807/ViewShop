import { Body, Controller, Post, Req } from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import { ValidateGuard } from './guard.dto';

@Controller('guards/guard')
export class GuardController {
  constructor(private readonly guardsService: GuardsService) {}

  @Post('validate')
  validate(@Body() data: ValidateGuard, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;
    return this.guardsService.send('GUARD:VALIDATE', {
      userId: user.userId,
      patch: data.patch,
    });
  }
}
