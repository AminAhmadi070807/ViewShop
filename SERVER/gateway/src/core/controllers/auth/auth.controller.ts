import { Body, Controller, Post, Req } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { AuthLoginDto } from './auth.dto';
import express from 'express';
import { Public } from '../../../common/decorators/public.decorator';

@Controller('core/auth')
export class AuthController {
  constructor(private readonly coreService: CoreService) {}

  @Public()
  @Post('login')
  login(@Body() data: AuthLoginDto, @Req() req: express.Request) {
    const userAgent: string | undefined = req.headers['user-agent'];
    return this.coreService.send('AUTH:LOGIN', {
      phone: data.phone,
      password: data.password,
      device: userAgent,
    });
  }
}
