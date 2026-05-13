import { Controller, Post, Req } from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';

@Controller('guards/users')
export class UserController {
  constructor(private readonly guardsService: GuardsService) {}

  @Post()
  create(@Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.guardsService.send('USER:CREATE', {
      role: user.role,
      id: user.userId,
    });
  }
}
